  // Reproducir música al cargar la página
      const audio = document.getElementById("audio-musica");
      audio.play().catch(() => {
        const activarMusica = () => {
          audio.play();
          document.removeEventListener("click", activarMusica);
          document.removeEventListener("touchstart", activarMusica);
        };
        document.addEventListener("click", activarMusica);
        document.addEventListener("touchstart", activarMusica);
      });
      // Configuración del canvas de galaxia
      const galaxyCanvas = document.getElementById("galaxyCanvas");
      const galaxyCtx = galaxyCanvas.getContext("2d");

      // Configuración del canvas de partículas
      const loveCanvas = document.getElementById("loveRain");
      const loveCtx = loveCanvas.getContext("2d");

      function resizeCanvases() {
        galaxyCanvas.width = loveCanvas.width = window.innerWidth;
        galaxyCanvas.height = loveCanvas.height = window.innerHeight;
      }
      resizeCanvases();

      // Galaxia y estrellas (sin nebulosa central)
      class Star {
        constructor() {
          this.x = Math.random() * galaxyCanvas.width;
          this.y = Math.random() * galaxyCanvas.height;
          this.size = Math.random() * 1.2;
          this.brightness = 0.1 + Math.random() * 0.9;
          this.speed = 0.1 + Math.random() * 0.3;
          this.opacity = 0;
          this.targetOpacity = this.brightness;
          this.twinkleSpeed = 0.01 + Math.random() * 0.05;
        }

        update() {
          this.y += this.speed;
          if (this.y > galaxyCanvas.height) {
            this.y = 0;
            this.x = Math.random() * galaxyCanvas.width;
          }

          // Efecto de parpadeo más sutil
          if (Math.random() < 0.005) {
            this.targetOpacity = Math.random() * this.brightness;
          }

          if (this.opacity < this.targetOpacity) {
            this.opacity += this.twinkleSpeed;
          } else if (this.opacity > this.targetOpacity) {
            this.opacity -= this.twinkleSpeed;
          }
        }

        draw() {
          galaxyCtx.beginPath();
          galaxyCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          galaxyCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          galaxyCtx.fill();
        }
      }

      // Crear galaxia uniforme
      const stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push(new Star());
      }

      // Animación de galaxia sin nebulosa
      function animateGalaxy() {
        galaxyCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
        galaxyCtx.fillRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);

        if (Math.random() < 0.02) {
          galaxyCtx.beginPath();
          galaxyCtx.arc(
            Math.random() * galaxyCanvas.width,
            Math.random() * galaxyCanvas.height,
            1 + Math.random() * 0.8,
            0,
            Math.PI * 2
          );
          galaxyCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
          galaxyCtx.fill();
        }

        stars.forEach((star) => {
          star.update();
          star.draw();
        });

        requestAnimationFrame(animateGalaxy);
      }
      animateGalaxy();

      // Partículas de amor adaptadas para móvil
      const compliments = [
        "Tus ojos brillan",
        "Sonrisa perfecta",
        "Eres angelical",
        "Belleza única",
        "Piel de seda",
        "Labios de miel",
        "Mirada cautivante",
        "Eres un sueño",
        "Figura divina",
        "Eres luz",
        "Cabello hermoso",
        "Elegante y bella",
        "Radiante",
        "Eres magia",
        "Belleza sin igual",
        "De otro mundo",
        "Eres arte",
        "Diosa terrenal",
        "Hermosa por siempre",
        "Lo más bello",
        "Perfecta en todo",
        "Eres la mejor",
        "Belleza pura",
        "Me vuelves loco",
        "Eres increíble",
        "Me fascinas",
        "Todo en ti es perfecto",
        "Eres especial",
        "Mi razón",
        "Mi inspiración",
      ];

      const symbols = ["❤️", "💖", "💘", "💝", "🌹", "✨", "🥰", "💕"];
      const colors = [
        "#ff55ff",
        "#ff77ff",
        "#ff99ff",
        "#ffbbff",
        "#ff00ff",
        "#cc00cc",
        "#aa00aa",
        "#ff66aa",
        "#ff0088",
        "#ff3377",
        "#ff5599",
        "#ff0099",
      ];

      const particles = [];
      const particleCount = 40;

      for (let i = 0; i < particleCount; i++) {
        const isText = Math.random() > 0.4;
        particles.push({
          x: Math.random() * loveCanvas.width,
          y: Math.random() * -loveCanvas.height,
          speed: 0.5 + Math.random() * 1.5,
          size: isText ? 14 + Math.random() * 8 : 20 + Math.random() * 15, // Tamaño aumentado
          content: isText
            ? compliments[Math.floor(Math.random() * compliments.length)]
            : symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: 0,
          opacity: 0.9,
          sway: Math.random() * 1 - 0.5,
          swaySpeed: 0.01 + Math.random() * 0.02,
          isText: isText,
        });
      }

      function animateLove() {
        loveCtx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

        particles.forEach((particle) => {
          loveCtx.save();
          loveCtx.translate(particle.x, particle.y);
          loveCtx.globalAlpha = particle.opacity;

          if (!particle.isText) {
            loveCtx.font = `${particle.size}px serif`;
            loveCtx.fillStyle = particle.color;
            loveCtx.textAlign = "center";
            loveCtx.textBaseline = "middle";
            loveCtx.fillText(particle.content, 0, 0);
          } else {
            loveCtx.font = `bold ${particle.size}px 'Arial', sans-serif`;
            loveCtx.fillStyle = particle.color;
            loveCtx.textAlign = "center";
            loveCtx.textBaseline = "middle";

            const words = particle.content.split(" ");
            if (words.length > 2 && particle.content.length > 12) {
              const middle = Math.floor(words.length / 2);
              const line1 = words.slice(0, middle).join(" ");
              const line2 = words.slice(middle).join(" ");
              loveCtx.fillText(line1, 0, -particle.size / 2);
              loveCtx.fillText(line2, 0, particle.size / 2);
            } else {
              loveCtx.fillText(particle.content, 0, 0);
            }
          }

          loveCtx.restore();

          particle.y += particle.speed;
          particle.x +=
            particle.sway * Math.sin(particle.y * particle.swaySpeed);

          if (particle.y > loveCanvas.height + 50) {
            particle.y = -20;
            particle.x = Math.random() * loveCanvas.width;
            const isText = Math.random() > 0.4;
            particle.content = isText
              ? compliments[Math.floor(Math.random() * compliments.length)]
              : symbols[Math.floor(Math.random() * symbols.length)];
            particle.color = colors[Math.floor(Math.random() * colors.length)];
            particle.size = isText
              ? 14 + Math.random() * 8
              : 20 + Math.random() * 15; // Tamaño aumentado
            particle.isText = isText;
          }
        });

        requestAnimationFrame(animateLove);
      }
      animateLove();

      // Función para crear explosión de elogios
      function createComplimentBurst(x, y) {
        const burstCount = 10 + Math.floor(Math.random() * 10);
        const burstCompliments = [
          "Hermosa",
          "Preciosa",
          "Radiante",
          "Divina",
          "Maravillosa",
          "Perfecta",
          "Increíble",
          "Única",
          "Especial",
          "Fantástica",
          "Sensacional",
          "Deslumbrante",
        ];

        for (let i = 0; i < burstCount; i++) {
          const elogio = document.createElement("div");
          elogio.className = "burst-text";
          elogio.textContent =
            burstCompliments[
              Math.floor(Math.random() * burstCompliments.length)
            ];

          elogio.style.left = `${x}px`;
          elogio.style.top = `${y}px`;

          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;

          const size = 20 + Math.random() * 25; // Tamaño aumentado
          elogio.style.fontSize = `${size}px`;

          elogio.style.color =
            colors[Math.floor(Math.random() * colors.length)];

          elogio.style.setProperty("--tx", `${tx}px`);
          elogio.style.setProperty("--ty", `${ty}px`);

          document.body.appendChild(elogio);

          setTimeout(() => {
            elogio.remove();
          }, 2000);
        }
      }

      document.addEventListener("click", (e) => {
        createComplimentBurst(e.clientX, e.clientY);
      });

      document.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        createComplimentBurst(touch.clientX, touch.clientY);
      });

      window.addEventListener("resize", () => {
        resizeCanvases();
      });

      document.addEventListener("gesturestart", function (e) {
        e.preventDefault();
      });