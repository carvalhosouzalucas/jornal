/* ============================================================
   home_jornal.js — liga a home ao que o admin salvou.
   Depende do ADM_js.js (carregue-o antes deste arquivo).
   ============================================================ */
(function () {

    // Dá aos containers os ids que as funções de renderização procuram.
    function identificarContainers() {
        [
            ['.lista_equipe', 'lista_equipe'],
            ['.noticia_destaque', 'noticia_destaque'],
            ['.lista_noticias', 'lista_noticias'],
            ['.contato_info', 'contato_info'],
            ['.coluna_opiniao', 'coluna_opiniao'],
            ['#conheca > h2', 'conheca_titulo']
        ].forEach(function (par) {
            const el = document.querySelector(par[0]);
            if (el && !el.id) el.id = par[1];
        });
    }

    // Divide o "Conheça a cidade" em dois blocos: tudo a partir da
    // primeira figura (bloco 1) e tudo a partir da segunda (bloco 2).
    function envolverConheca() {
        const secao = document.getElementById('conheca');
        if (!secao || document.getElementById('conheca_bloco1')) return;

        const figuras = secao.querySelectorAll(':scope > figure');
        if (figuras.length < 2) return;

        const nos = [];
        for (let no = figuras[0]; no; no = no.nextElementSibling) nos.push(no);

        const bloco1 = document.createElement('div');
        bloco1.id = 'conheca_bloco1';
        const bloco2 = document.createElement('div');
        bloco2.id = 'conheca_bloco2';

        secao.insertBefore(bloco1, figuras[0]);
        secao.appendChild(bloco2);

        let destino = bloco1;
        nos.forEach(function (no) {
            if (no === figuras[1]) destino = bloco2;
            destino.appendChild(no);
        });
    }

    function temDadosSalvos() {
        try {
            return !!localStorage.getItem('jornal_dados');
        } catch (e) {
            return false;
        }
    }

    identificarContainers();

    // Os artigos de opinião sempre vêm dos dados: os links do HTML original
    // não levam a lugar nenhum, e aqui cada título passa a abrir o seu artigo.
    renderOpiniao(carregarDados(), false);

    // Sem nada salvo pelo admin, o resto da página fica como está no HTML.
    if (temDadosSalvos()) {
        envolverConheca();
        aplicarDadosSalvosSeExistirem(false);
    }

})();