import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eraser,
  RotateCcw,
  Check,
  Download,
  Palette,
  Minus,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HandwritingCanvasProps {
  targetCharacter?: string;
  onSubmit?: (imageData: string) => void;
  showGuide?: boolean;
}

export default function HandwritingCanvas({
  targetCharacter,
  onSubmit,
  showGuide = true,
}: HandwritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokes, setStrokes] = useState<any[]>([]);
  const [currentStroke, setCurrentStroke] = useState<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw background and guide
    drawBackground(ctx);
  }, []);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    
    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showGuide) {
      // Draw guide lines
      ctx.strokeStyle = "#e5e5e5";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Horizontal center line
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Vertical center line
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      // Reset line dash
      ctx.setLineDash([]);

      // Draw target character as guide
      if (targetCharacter) {
        ctx.font = "120px 'Noto Sans Tamil'";
        ctx.fillStyle = "#f0f0f0";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(targetCharacter, canvas.width / 2, canvas.height / 2);
      }
    }

    // Redraw all strokes
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    strokes.forEach((stroke) => {
      ctx.beginPath();
      stroke.forEach((point: any, index: number) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    });
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setCurrentStroke([]);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: "touches" in e
        ? e.touches[0].clientX - rect.left
        : e.nativeEvent.offsetX,
      y: "touches" in e
        ? e.touches[0].clientY - rect.top
        : e.nativeEvent.offsetY,
    };

    setCurrentStroke([point]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const point = {
      x: "touches" in e
        ? e.touches[0].clientX - rect.left
        : e.nativeEvent.offsetX,
      y: "touches" in e
        ? e.touches[0].clientY - rect.top
        : e.nativeEvent.offsetY,
    };

    const newStroke = [...currentStroke, point];
    setCurrentStroke(newStroke);

    // Draw the current stroke
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();

    if (currentStroke.length > 0) {
      ctx.moveTo(currentStroke[currentStroke.length - 1].x, currentStroke[currentStroke.length - 1].y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke.length > 0) {
      setStrokes([...strokes, currentStroke]);
    }
    setIsDrawing(false);
    setCurrentStroke([]);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    setStrokes([]);
    setCurrentStroke([]);
    drawBackground(ctx);
  };

  const undoLastStroke = () => {
    if (strokes.length === 0) return;

    const newStrokes = strokes.slice(0, -1);
    setStrokes(newStrokes);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    // Redraw with updated strokes
    drawBackground(ctx);
  };

  const submitDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas || !onSubmit) return;

    const imageData = canvas.toDataURL("image/png");
    onSubmit(imageData);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `tamil-character-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const colors = [
    "#000000",
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
  ];

  return (
    <Card className="p-6">
      {/* Header */}
      {targetCharacter && (
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Practice writing this character:
          </p>
          <div className="text-6xl font-bold tamil-text">{targetCharacter}</div>
        </div>
      )}

      {/* Canvas */}
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          className="w-full h-80 border-2 border-border rounded-lg cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {strokes.length > 0 && (
          <Badge className="absolute top-2 right-2">
            {strokes.length} stroke{strokes.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Tools */}
      <div className="space-y-3">
        {/* Stroke Width */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-20">Stroke:</span>
          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStrokeWidth(Math.max(1, strokeWidth - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center">
              <div
                className="inline-block bg-foreground rounded-full"
                style={{
                  width: strokeWidth * 3,
                  height: strokeWidth * 3,
                }}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setStrokeWidth(Math.min(10, strokeWidth + 1))}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-20">Color:</span>
          <div className="flex gap-2 flex-1">
            {colors.map((color) => (
              <button
                key={color}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all",
                  strokeColor === color
                    ? "border-primary scale-110"
                    : "border-border hover:scale-105"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setStrokeColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={undoLastStroke}
            disabled={strokes.length === 0}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            onClick={clearCanvas}
            disabled={strokes.length === 0}
          >
            <Eraser className="mr-2 h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={downloadImage}
            disabled={strokes.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button
            variant="gradient"
            onClick={submitDrawing}
            disabled={strokes.length === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
}