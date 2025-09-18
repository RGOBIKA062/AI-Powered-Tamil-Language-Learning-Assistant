// Spaced Repetition System (SRS) implementation for TamilBuddy

export interface SRSCard {
  id: string;
  front: string;
  back: string;
  nextReview: Date;
  interval: number; // days
  easeFactor: number;
  reviews: number;
  lapses: number;
}

export enum ReviewQuality {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

export class SpacedRepetitionSystem {
  // SuperMemo SM-2 algorithm implementation
  private static readonly MIN_EASE_FACTOR = 1.3;
  private static readonly INITIAL_EASE_FACTOR = 2.5;
  private static readonly INITIAL_INTERVALS = [1, 6]; // days

  static calculateNextReview(
    card: SRSCard,
    quality: ReviewQuality
  ): SRSCard {
    const updatedCard = { ...card };
    
    // Update ease factor
    const qFactor = quality - 1; // 0-3
    updatedCard.easeFactor = Math.max(
      this.MIN_EASE_FACTOR,
      card.easeFactor + (0.1 - (3 - qFactor) * (0.08 + (3 - qFactor) * 0.02))
    );

    // Calculate new interval
    if (quality === ReviewQuality.Again) {
      // Reset card
      updatedCard.interval = 1;
      updatedCard.lapses++;
    } else if (card.reviews === 0) {
      // First review
      updatedCard.interval = this.INITIAL_INTERVALS[0];
    } else if (card.reviews === 1) {
      // Second review
      updatedCard.interval = this.INITIAL_INTERVALS[1];
    } else {
      // Subsequent reviews
      let newInterval = card.interval * updatedCard.easeFactor;
      
      // Apply quality modifiers
      switch (quality) {
        case ReviewQuality.Hard:
          newInterval *= 0.8;
          break;
        case ReviewQuality.Easy:
          newInterval *= 1.3;
          break;
      }
      
      // Add some randomness to prevent clustering
      const fuzz = 0.05;
      const fuzzRange = newInterval * fuzz;
      newInterval += (Math.random() * fuzzRange * 2) - fuzzRange;
      
      updatedCard.interval = Math.round(newInterval);
    }

    // Set next review date
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + updatedCard.interval);
    updatedCard.nextReview = nextReviewDate;
    
    // Increment review count
    updatedCard.reviews++;

    return updatedCard;
  }

  static getDueCards(cards: SRSCard[]): SRSCard[] {
    const now = new Date();
    return cards.filter(card => card.nextReview <= now);
  }

  static getUpcomingCards(cards: SRSCard[], days: number = 7): SRSCard[] {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    
    return cards.filter(card => 
      card.nextReview > now && card.nextReview <= future
    );
  }

  static createNewCard(front: string, back: string): Omit<SRSCard, 'id'> {
    return {
      front,
      back,
      nextReview: new Date(),
      interval: 0,
      easeFactor: this.INITIAL_EASE_FACTOR,
      reviews: 0,
      lapses: 0,
    };
  }

  static getRetentionStats(cards: SRSCard[]): {
    retention: number;
    averageEaseFactor: number;
    maturedCards: number;
    learningCards: number;
    relearningCards: number;
  } {
    if (cards.length === 0) {
      return {
        retention: 0,
        averageEaseFactor: 0,
        maturedCards: 0,
        learningCards: 0,
        relearningCards: 0,
      };
    }

    const totalReviews = cards.reduce((sum, card) => sum + card.reviews, 0);
    const totalLapses = cards.reduce((sum, card) => sum + card.lapses, 0);
    const retention = totalReviews > 0 
      ? ((totalReviews - totalLapses) / totalReviews) * 100 
      : 0;

    const averageEaseFactor = 
      cards.reduce((sum, card) => sum + card.easeFactor, 0) / cards.length;

    const maturedCards = cards.filter(card => card.interval >= 21).length;
    const learningCards = cards.filter(card => 
      card.reviews < 2 && card.lapses === 0
    ).length;
    const relearningCards = cards.filter(card => card.lapses > 0).length;

    return {
      retention: Math.round(retention),
      averageEaseFactor: Math.round(averageEaseFactor * 100) / 100,
      maturedCards,
      learningCards,
      relearningCards,
    };
  }

  // Heatmap data for study calendar
  static getStudyHeatmap(
    sessions: { date: Date; cardsReviewed: number }[]
  ): Map<string, number> {
    const heatmap = new Map<string, number>();
    
    sessions.forEach(session => {
      const dateKey = session.date.toISOString().split('T')[0];
      const current = heatmap.get(dateKey) || 0;
      heatmap.set(dateKey, current + session.cardsReviewed);
    });
    
    return heatmap;
  }

  // Forecast future review load
  static getForecast(
    cards: SRSCard[],
    days: number = 30
  ): { date: Date; count: number }[] {
    const forecast: Map<string, number> = new Map();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Initialize all days
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      forecast.set(dateKey, 0);
    }
    
    // Count reviews per day
    cards.forEach(card => {
      const reviewDate = new Date(card.nextReview);
      reviewDate.setHours(0, 0, 0, 0);
      const dateKey = reviewDate.toISOString().split('T')[0];
      
      if (forecast.has(dateKey)) {
        forecast.set(dateKey, (forecast.get(dateKey) || 0) + 1);
      }
    });
    
    // Convert to array
    return Array.from(forecast.entries()).map(([dateStr, count]) => ({
      date: new Date(dateStr),
      count,
    }));
  }
}

// Leitner System implementation (simpler alternative to SM-2)
export class LeitnerSystem {
  private static readonly BOX_INTERVALS = [1, 3, 7, 14, 30]; // days

  static moveCard(
    currentBox: number,
    correct: boolean
  ): { newBox: number; nextReview: Date } {
    let newBox: number;
    
    if (correct) {
      // Move to next box
      newBox = Math.min(currentBox + 1, this.BOX_INTERVALS.length - 1);
    } else {
      // Move back to first box
      newBox = 0;
    }
    
    const interval = this.BOX_INTERVALS[newBox];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);
    
    return { newBox, nextReview };
  }
}