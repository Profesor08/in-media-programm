interface PartProps {
  SW: number;
  SH: number;
  ctx: CanvasRenderingContext2D;
}

class Part {
  private x: number;
  private y: number;
  private prevX: number;
  private prevY: number;
  private size: number;
  private time: number;
  private dir: number;
  private targetDir: number;
  private turnCount: number;
  private alpha: number;
  private posHistory: [[number, number]];
  private maxLineLength: number;
  private SW: number;
  private SH: number;
  private ctx: CanvasRenderingContext2D;

  constructor({ ctx, SW, SH }: PartProps) {
    this.ctx = ctx;
    this.SW = SW;
    this.SH = SH;
    this.x = this.prevX = Math.random() * this.SW;
    this.y = this.prevY = Math.random() * this.SH;
    this.size = 1;
    this.time = 0;
    this.dir = 1;
    this.targetDir = 1;
    this.turnCount = Math.random() * 1000;
    this.alpha = 1;
    this.posHistory = [[this.x, this.y]];
    this.maxLineLength = 100;
  }

  update() {
    this.time += 0.1;

    this.dir += Math.sign(this.targetDir - this.dir) * 0.1;

    this.turnCount -= 1;
    if (this.turnCount < 0) {
      this.turnCount = Math.random() * 50 + 50;
      this.targetDir *= -1;
    }

    this.move();
    this.wrap();
    this.render();
    this.recordPrevPos();
  }

  move() {
    this.x += 3 * this.dir;
    this.y += 1.5;
  }

  wrap() {
    if (this.x > this.SW) {
      this.x = 0;
      // this.resetPrevPos();
    }
    if (this.x < 0) {
      this.x = this.SW;
      // this.resetPrevPos();
    }
    if (this.y > this.SH) {
      this.y = 0;
      this.x = Math.random() * this.SW;
      // this.resetPrevPos();
    }
    if (this.y < 0) {
      this.y = this.SH;
      // this.resetPrevPos();
    }
  }

  render() {
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.posHistory.length - 1; i++) {
      const pointA = this.posHistory[i];
      const pointB = this.posHistory[i + 1];

      const a = pointA[0] - pointB[0];
      const b = pointA[1] - pointB[1];
      const dist = Math.sqrt(a * a + b * b);

      if (dist < 10) {
        // draw line
        const alphaMod = i / this.posHistory.length;
        let alpha = (pointA[1] / this.SH) * this.alpha * alphaMod;
        // alpha = 1;

        this.ctx.beginPath();
        alpha *= 255;
        this.ctx.strokeStyle =
          "rgba(" + alpha + ", " + alpha + ", " + alpha + ", 1)";

        this.ctx.moveTo(pointA[0], pointA[1]);
        this.ctx.lineTo(pointB[0], pointB[1]);

        this.ctx.closePath();
        this.ctx.stroke();
      }
    }

    // draw circle
    const leadPoint = this.posHistory[this.posHistory.length - 1];
    let alpha = (leadPoint[1] / this.SH) * this.alpha;
    alpha *= 255;
    this.ctx.fillStyle = "rgba(" + alpha + ", " + alpha + ", " + alpha + ", 1)";
    this.ctx.strokeStyle = "rgba(26, 26, 26, 0)";
    this.ctx.beginPath();
    this.ctx.arc(leadPoint[0], leadPoint[1], this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  recordPrevPos() {
    const pointA = this.posHistory[this.posHistory.length - 1];
    const pointB = [this.x, this.y];

    const a = pointA[0] - pointB[0];
    const b = pointA[1] - pointB[1];
    const dist = Math.sqrt(a * a + b * b);

    if (dist > 3) {
      this.posHistory.push([this.x, this.y]);
      if (this.posHistory.length > this.maxLineLength) {
        this.posHistory.shift();
      }
    }
  }
}

export function AboutBackgroundAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    init(ctx);
  }

  function init(ctx: CanvasRenderingContext2D) {
    // configure for retina
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // save screen dimensions for later use
    let SW = rect.width;
    let SH = rect.height;

    // clear background
    clearCanvas();

    // create parts
    const numParts = 30;
    const allParts: Part[] = [];
    for (let i = 0; i < numParts; i++) {
      allParts.push(
        new Part({
          ctx,
          SW,
          SH,
        }),
      );
    }

    function update() {
      clearCanvas();

      for (let i = 0; i < numParts; i++) {
        const part = allParts[i];
        part.update();
      }

      window.requestAnimationFrame(update);
    }

    update();

    function clearCanvas() {
      ctx.fillStyle = "#1A1A1A";
      ctx.strokeStyle = "rgba(26, 26, 26, 0)";
      ctx.fillRect(0, 0, SW, SH);
    }

    function fadeCanvas() {
      ctx.fillStyle = "rgba(26, 26, 26, 0.1)";
      ctx.strokeStyle = "rgba(26, 26, 26, 0)";
      ctx.fillRect(0, 0, SW, SH);
    }
  }
}
