
      (function () {
        var nav = document.querySelector("nav"),
          navShown = false;
        function updateNav() {
          var show = window.scrollY > 100;
          if (show !== navShown) {
            navShown = show;
            nav.classList.toggle("visible", show);
            nav.inert = !show;
          }
        }
        updateNav();
        window.addEventListener("scroll", updateNav, { passive: true });
        var badge = document.getElementById("profile-badge");
        if (
          badge &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          window.setInterval(function () {
            badge.classList.toggle("is-flipped");
            var back = badge.querySelector(".badge-back");
            back.setAttribute(
              "aria-hidden",
              badge.classList.contains("is-flipped") ? "false" : "true",
            );
          }, 12000);
        }
        var type = document.getElementById("type"),
          reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
          ).matches;
        if (type && !reducedMotion) {
          var message = type.textContent.trim(),
            charIndex = 0;
          type.textContent = "";
          window.setTimeout(function typeNext() {
            charIndex++;
            type.textContent = message.slice(0, charIndex);
            if (charIndex < message.length) window.setTimeout(typeNext, 36);
          }, 450);
        }
        var s = [
            "Next.js 15",
            "TypeScript",
            "React Native",
            "Expo",
            "Node.js",
            "Supabase",
            "pgvector",
            "Drizzle",
            "Trigger.dev",
            "Paystack",
            "Stripe",
          ],
          h = "";
        for (var n = 0; n < 2; n++)
          s.forEach(function (x) {
            h += "<span>" + x + "</span><span>✦</span>";
          });
        document.getElementById("mq").innerHTML = h + h;
        var io = new IntersectionObserver(
          function (e) {
            e.forEach(function (x) {
              if (x.isIntersecting) {
                x.target.classList.add("on");
                io.unobserve(x.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        document.querySelectorAll(".rv").forEach(function (x) {
          io.observe(x);
        });
        document.querySelectorAll(".shot").forEach(function (c) {
          c.addEventListener("mousemove", function (e) {
            var r = c.getBoundingClientRect();
            c.style.setProperty(
              "--ry",
              ((e.clientX - r.left) / r.width - 0.5) * 14 + "deg",
            );
            c.style.setProperty(
              "--rx",
              (0.5 - (e.clientY - r.top) / r.height) * 10 + "deg",
            );
          });
          c.addEventListener("mouseleave", function () {
            c.style.setProperty("--ry", "0deg");
            c.style.setProperty("--rx", "0deg");
          });
        });
        var tr = document.querySelector(".track"),
          d = 0,
          sx = 0,
          sl = 0;
        tr.addEventListener("mousedown", function (e) {
          d = 1;
          sx = e.pageX;
          sl = tr.scrollLeft;
          tr.style.scrollSnapType = "none";
        });
        window.addEventListener("mouseup", function () {
          d = 0;
          tr.style.scrollSnapType = "";
        });
        window.addEventListener("mousemove", function (e) {
          if (d) tr.scrollLeft = sl - (e.pageX - sx);
        });
      })();
    
