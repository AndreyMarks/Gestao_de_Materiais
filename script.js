// Variáveis globais para persistência de dados (simulação)
const INVENTORY_STORAGE_KEY = 'inventoryData';
const USERS_STORAGE_KEY = 'usersData';
const LOGGED_IN_KEY = 'isLoggedIn';

// --- Funções de Persistência ---

function getInventory() {
    const inventory = localStorage.getItem(INVENTORY_STORAGE_KEY);
    return inventory ? JSON.parse(inventory) : [
        { nome: 'Papel Sulfite', estoque: 30, pedidos: 12, previsao: 'Sim', subproduto: 'Escritório', pn: 'PN001', unidade: 'Resma', preco: 15.50 },
        { nome: 'Papel Toalha', estoque: 21, pedidos: 15, previsao: 'Não', subproduto: 'Limpeza', pn: 'PN002', unidade: 'Pacote', preco: 8.90 },
        { nome: 'Caixa Box', estoque: 19, pedidos: 17, previsao: 'Sim', subproduto: 'Embalagem', pn: 'PN003', unidade: 'Un', preco: 4.00 },
        { nome: 'Caneta', estoque: 100, pedidos: 5, previsao: 'Não', subproduto: 'Escritório', pn: 'PN004', unidade: 'Un', preco: 1.20 },
        { nome: 'Etiqueta', estoque: 50, pedidos: 8, previsao: 'Sim', subproduto: 'Embalagem', pn: 'PN005', unidade: 'Rolo', preco: 25.00 },
        { nome: 'Fita Adesiva', estoque: 45, pedidos: 10, previsao: 'Não', subproduto: 'Embalagem', pn: 'PN006', unidade: 'Rolo', preco: 6.50 },
    ];
}

function saveInventory(inventory) {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
}

function getUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [
        { email: 'admin@latam.com', password: 'admin', name: 'Administrador' }
    ];
}

function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function setLoggedIn(isLoggedIn) {
    localStorage.setItem(LOGGED_IN_KEY, isLoggedIn ? 'true' : 'false');
}

function isLoggedIn() {
    return localStorage.getItem(LOGGED_IN_KEY) === 'true';
}

// --- Lógica de Login/Cadastro ---

if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    const loginBtn2 = document.getElementById("loginBtn2");
    const registerBtn2 = document.getElementById("registerBtn2");

    function showLoginForm() {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
        loginBtn.classList.add("active");
        registerBtn.classList.remove("active");
        loginBtn2.classList.remove("active");
        registerBtn2.classList.add("active");
    }

    function showRegisterForm() {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
        loginBtn.classList.remove("active");
        registerBtn.classList.add("active");
        loginBtn2.classList.add("active");
        registerBtn2.classList.remove("active");
    }

    if (registerBtn) registerBtn.addEventListener("click", showRegisterForm);
    if (loginBtn2) loginBtn2.addEventListener("click", showLoginForm);

    // Redirecionamento inicial: se logado, vai para dashboard
    if (isLoggedIn()) {
        window.location.replace("dashboard.html");
    }

    // Lógica de Login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const users = getUsers();

        const user = users.find(u => u.email === email && u.password === password);


        if (user) {
            setLoggedIn(true);
            alert(`Bem-vindo, ${user.name}!`);

            window.location.replace("dashboard.html");
        } else {
            alert('Email ou senha incorretos.');

        }
    });

    // Lógica de Registro
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const users = getUsers();

        if (users.some(u => u.email === email)) {
            alert('Este email já está cadastrado.');
            return;
        }

        users.push({ email, password, name });
        saveUsers(users);
        alert('Registro realizado com sucesso! Faça login.');
        showLoginForm();
    });

    // Lógica de Recuperação de Senha (Modal Inline)
    const forgotLinkInline = document.getElementById('forgotLink');
    const resetModalInline = document.getElementById('resetPasswordInline');
    const closeInline = document.getElementById('closeInline');
    const resetBtnInline = document.getElementById('resetBtnInline');

    if (forgotLinkInline) {
        forgotLinkInline.addEventListener('click', (e) => {
            e.preventDefault();
            resetModalInline.style.display = 'block';
        });
    }

    if (closeInline) {
        closeInline.addEventListener('click', () => {
            resetModalInline.style.display = 'none';
        });
    }

    if (resetBtnInline) {
        resetBtnInline.addEventListener('click', () => {
            const email = document.getElementById('reset-email-inline').value;

            if (email) {
                alert(`Instruções de recuperação enviadas para ${email}. (Simulação)`);
                resetModalInline.style.display = 'none';
            } else {
                alert('Digite um e-mail válido!');
            }
        });
    }
}

// --- Lógica de Navegação e Logout ---

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está em uma página de aplicação (não login)
    const isAppPage = document.querySelector('.sidebar');

    if (isAppPage) {
        // Se não estiver logado, redireciona para o login
        if (!isLoggedIn()) {
            window.location.replace("login.html");
            return;
        }

        // Adiciona a classe ao body para aplicar os estilos de app
        document.body.classList.add('app-body');
        document.querySelector('.container').classList.add('app-container');

        // Lógica do Menu Mobile
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const menuItems = document.querySelectorAll('.menu-item');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
                const icon = mobileMenuToggle.querySelector('i');
                
                if (sidebar.classList.contains('mobile-open')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Fechar menu ao clicar em um item (em mobile)
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    if (mobileMenuToggle) {
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Lógica de Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                setLoggedIn(false);
                window.location.replace("login.html");
            });
        }
    }
});

// --- Lógica de Gestão de Materiais (Inventário, Cadastro, Pedidos, Relatórios) ---

// Funções de Renderização
function renderInventoryTable(inventory) {
    const tableBody = document.querySelector('.inventario-content .data-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Limpa a tabela

    inventory.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Nome">${item.nome}</td>
            <td data-label="Estoque atual">${item.estoque}</td>
            <td data-label="Pedidos para este item">${item.pedidos}</td>
            <td data-label="Previsão de entrega">${item.previsao}</td>
            <td data-label="Ações" class="action-cell">
                <a href="#" class="action-icon edit-item" data-item-name="${item.nome}"><i class="fas fa-pen"></i></a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function renderLowStockTable(items) {
    const tableBody = document.querySelector('.low-stock .data-table tbody');
    if (!tableBody) return;

    tableBody.innerHTML = ''; // Limpa a tabela

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Nome">${item.nome}</td>
            <td data-label="Estoque atual">${item.estoque}</td>
            <td data-label="Pedidos para este item">${item.pedidos}</td>
            <td data-label="Previsão de entrega">${item.previsao}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Inicialização das Páginas de App
document.addEventListener('DOMContentLoaded', () => {
    // Página de Inventário
    if (document.querySelector('.inventario-content')) {
        const inventory = getInventory();
        renderInventoryTable(inventory);

        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredInventory = inventory.filter(item => item.nome.toLowerCase().includes(searchTerm));
            renderInventoryTable(filteredInventory);
        });
    }

    // Página Inicial (Dashboard)
    if (document.querySelector('.dashboard') && !document.querySelector('.inventario-content') && !document.getElementById('orderViewContainer') && !document.getElementById('formCadastroMaterial') && !document.querySelector('.relatorios-grid')) {
        const inventory = getInventory();
        const lowStockItems = inventory.filter(item => item.estoque < 50); // Exemplo: Itens com menos de 50 unidades
        renderLowStockTable(lowStockItems);
    }

    // --- Lógica da Tela de Cadastro ---
    const formCadastroMaterial = document.getElementById('formCadastroMaterial');
    if (formCadastroMaterial) {
        formCadastroMaterial.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nomeOperacional').value;
            const subproduto = document.getElementById('subproduto').value;
            const pn = document.getElementById('pnCodigo').value;
            const unidade = document.getElementById('unidade').value;
            const preco = parseFloat(document.getElementById('precoUnitario').value);
            const estoque = parseInt(document.getElementById('estoqueInicial').value);

            const newItem = {
                nome: nome,
                estoque: estoque,
                pedidos: 0,
                previsao: 'Não',
                subproduto: subproduto,
                pn: pn,
                unidade: unidade,
                preco: preco
            };

            const inventory = getInventory();
            inventory.push(newItem);
            saveInventory(inventory);

            alert(`Material "${nome}" cadastrado com sucesso!`);
            formCadastroMaterial.reset();
        });
    }

    // --- Lógica da Tela de Pedidos ---
    const orderViewContainer = document.getElementById('orderViewContainer');
    if (orderViewContainer) {
        const btnNovoPedido = document.getElementById('btnNovoPedido');
        const btnAcompanharPedido = document.getElementById('btnAcompanharPedido');
        const btnAtualizarPedido = document.getElementById('btnAtualizarPedido');

        const novoPedidoView = document.getElementById('novoPedidoView');
        const acompanharPedidoView = document.getElementById('acompanharPedidoView');
        const atualizarPedidoView = document.getElementById('atualizarPedidoView');
        const pedidosEmAbertoView = document.getElementById('pedidosEmAbertoView');

        function switchView(viewToShow) {
            const allViews = [pedidosEmAbertoView, novoPedidoView, acompanharPedidoView, atualizarPedidoView];
            allViews.forEach(view => {
                if (view) {
                    view.classList.add('hidden-view');
                    view.classList.remove('active-view');
                }
            });

            if (viewToShow) {
                viewToShow.classList.remove('hidden-view');
                viewToShow.classList.add('active-view');
            }
        }

        // Inicialmente, mostra a tela de Pedidos em Aberto
        switchView(pedidosEmAbertoView);

        if (btnNovoPedido) btnNovoPedido.addEventListener('click', () => switchView(novoPedidoView));
        if (btnAcompanharPedido) btnAcompanharPedido.addEventListener('click', () => switchView(acompanharPedidoView));
        if (btnAtualizarPedido) btnAtualizarPedido.addEventListener('click', () => switchView(atualizarPedidoView));

        // Lógica para adicionar novo item no formulário de Novo Pedido
        const addItemBtn = document.getElementById('addItemBtn');
        const itensSolicitadosContainer = document.getElementById('itensSolicitados');
        let itemCount = 1;

        if (addItemBtn && itensSolicitadosContainer) {
            // Conta os itens existentes para começar a numeração corretamente
            itemCount = itensSolicitadosContainer.querySelectorAll('.item-row-compact').length;

            addItemBtn.addEventListener('click', () => {
                itemCount++;
                const newItemRow = document.createElement('div');
                newItemRow.classList.add('item-row-compact');
                newItemRow.innerHTML = `
                    <div class="form-group item-col-nome">
                        <input type="text" id="itemNome${itemCount}" name="itemNome${itemCount}" class="input-field" placeholder="Nome do Item" required>
                    </div>
                    <div class="form-group item-col-qtd">
                        <input type="number" id="itemQtd${itemCount}" name="itemQtd${itemCount}" class="input-field" placeholder="Qtd" required>
                    </div>
                    <div class="form-group item-col-obs">
                        <input type="text" id="itemObs${itemCount}" name="itemObs${itemCount}" class="input-field" placeholder="Observação">
                    </div>
                    <div class="form-group item-col-entrega">
                        <input type="text" id="itemEntrega${itemCount}" name="itemEntrega${itemCount}" class="input-field" placeholder="Entrega Área">
                    </div>
                    <button type="button" class="btn-remove-item">-</button>
                `;
                // Insere o novo item antes do botão de adicionar
                const btnAddItemCompact = document.querySelector('.btn-add-item-compact');
                itensSolicitadosContainer.insertBefore(newItemRow, btnAddItemCompact);
            });
        }

        // Lógica para remover item
        if (itensSolicitadosContainer) {
            itensSolicitadosContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-remove-item')) {
                    e.target.closest('.item-row-compact').remove();
                }
            });
        }

        // Lógica de submissão de formulários (apenas simulação)
        const formNovoPedido = document.getElementById('formNovoPedido');
        if (formNovoPedido) {
            formNovoPedido.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Pedido enviado com sucesso! (Simulação)');
                formNovoPedido.reset();
                // Volta para a tela de pedidos em aberto após o envio
                switchView(pedidosEmAbertoView);
            });
        }

        const formAcompanharPedido = document.getElementById('formAcompanharPedido');
        if (formAcompanharPedido) {
            formAcompanharPedido.addEventListener('submit', (e) => {
                e.preventDefault();
                const numPedido = document.getElementById('numPedidoAcompanhar').value;
                alert(`Buscando pedido ${numPedido}... (Simulação)`);
                // Aqui viria a lógica real de busca e exibição dos detalhes
            });
        }

        const formAtualizarPedido = document.getElementById('formAtualizarPedido');
        if (formAtualizarPedido) {
            formAtualizarPedido.addEventListener('submit', (e) => {
                e.preventDefault();
                const numPedido = document.getElementById('numPedidoAtualizar').value;
                alert(`Buscando pedido ${numPedido} para atualização... (Simulação)`);
                // Aqui viria a lógica real de busca e exibição do formulário de atualização
            });
        }
    }

    // --- Lógica da Tela de Relatórios (Gráficos) ---
    if (document.querySelector('.relatorios-grid')) {
        // Gauge Chart
        new Chart(document.getElementById('gaugeChart'), {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#4b0076', '#eee'],
                    borderWidth: 0,
                    cutout: '75%',
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Bases de Maior Envio
        new Chart(document.getElementById('barChart1'), {
            type: 'bar',
            data: {
                labels: ['GRU', 'GIG', 'SAO', 'BHZ'],
                datasets: [{
                    data: [100, 75, 90, 20],
                    backgroundColor: ['#009ee3', '#e4007f', '#4b0076', '#ccc']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });

        // Valor Enviado por Base
        new Chart(document.getElementById('donutChart'), {
            type: 'doughnut',
            data: {
                labels: ['GRU', 'GIG', 'SAO', 'BHZ'],
                datasets: [{
                    data: [35, 25, 30, 10],
                    backgroundColor: ['#4b0076', '#009ee3', '#e4007f', '#6b48a5']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // Itens com Maior Envio
        new Chart(document.getElementById('barChart2'), {
            type: 'bar',
            data: {
                labels: ['Colete', 'Luvas', 'Capacete', 'Botas'],
                datasets: [{
                    data: [90, 60, 30, 70],
                    backgroundColor: ['#009ee3', '#4b0076', '#e4007f', '#4b0076']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });

        // Valor de Itens Enviados
        new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D'],
                datasets: [{
                    data: [25, 20, 30, 25],
                    backgroundColor: ['#4b0076', '#009ee3', '#e4007f', '#6b48a5']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'right' } }
            }
        });
    }
});
