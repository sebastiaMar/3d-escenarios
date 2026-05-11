export function injectLayout(currentScenario = '') {
    // Estilos del layout superpuesto
    const style = document.createElement('style');
    style.textContent = `
        .layout-navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 30px;
            backdrop-filter: blur(10px);
            background: rgba(0, 0, 0, 0.55);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            transition: opacity 0.3s;
        }

        .layout-navbar h2 {
            margin: 0;
            font-size: 18px;
            color: white;
            text-decoration: none;
        }

        .layout-navbar a.brand {
            text-decoration: none;
            color: white;
            font-size: 18px;
            font-weight: bold;
        }

        .layout-navbar .menu a {
            margin: 0 10px;
            text-decoration: none;
            color: rgba(255,255,255,0.75);
            font-size: 14px;
            transition: color 0.3s;
        }

        .layout-navbar .menu a:hover {
            color: #00d4ff;
        }

        .layout-navbar .menu a.active {
            color: #00d4ff;
            border-bottom: 1px solid #00d4ff;
            padding-bottom: 2px;
        }

        .layout-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 30px;
            backdrop-filter: blur(10px);
            background: rgba(0, 0, 0, 0.55);
            border-top: 1px solid rgba(255,255,255,0.08);
            font-size: 13px;
            color: rgba(255,255,255,0.6);
        }

        .layout-footer a {
            color: #00d4ff;
            text-decoration: none;
            margin-left: 12px;
            transition: color 0.3s;
        }

        .layout-footer a:hover {
            color: white;
        }

        .layout-navbar.hidden,
        .layout-footer.hidden {
            opacity: 0;
            pointer-events: none;
        }

        .toggle-layout-btn {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1100;
            background: rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .toggle-layout-btn:hover {
            background: rgba(0,0,0,0.8);
        }
    `;
    document.head.appendChild(style);

    // Navbar
    const nav = document.createElement('nav');
    nav.className = 'layout-navbar';
    nav.innerHTML = `
        <a class="brand" href="../index.html">3D Scenarios</a>
        <div class="menu">
            <a href="minecraft.html" ${currentScenario === 'minecraft' ? 'class="active"' : ''}>Minecraft</a>
            <a href="map.html"       ${currentScenario === 'map'       ? 'class="active"' : ''}>Map Controls</a>
            <a href="orbit.html"     ${currentScenario === 'orbit'     ? 'class="active"' : ''}>Orbit Controls</a>
            <a href="pointerlock.html" ${currentScenario === 'pointerlock' ? 'class="active"' : ''}>Pointer Lock</a>
            <a href="transform.html" ${currentScenario === 'transform' ? 'class="active"' : ''}>Transform</a>
        </div>
    `;

    // Footer
    const footer = document.createElement('footer');
    footer.className = 'layout-footer';
    footer.innerHTML = `
    
    `;

    // Botón para ocultar/mostrar (útil en pointerlock y minecraft)
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-layout-btn';
    toggleBtn.textContent = 'Ocultar UI';
    toggleBtn.addEventListener('click', () => {
        const hidden = nav.classList.toggle('hidden');
        footer.classList.toggle('hidden');
        toggleBtn.textContent = hidden ? 'Mostrar UI' : 'Ocultar UI';
    });

    document.body.appendChild(nav);
    document.body.appendChild(footer);
    document.body.appendChild(toggleBtn);
}