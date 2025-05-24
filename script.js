document.addEventListener('DOMContentLoaded', () => {
    // Define a data de início do namoro para o contador
    const startDate = new Date('2024-10-26T00:00:00'); 
    const countdownElement = document.getElementById('countdown');
    const magalAudio = document.getElementById('magalAudio');
    const playMagalButton = document.getElementById('playMagal');

    // Função para atualizar o contador de dias
    function updateCountdown() {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Atualiza o texto do contador, adicionando a palavra "dias"
        countdownElement.textContent = diffDays + ' dias';
    }

    // Atualiza o contador imediatamente ao carregar a página
    updateCountdown();
    // Configura o contador para atualizar a cada 24 horas, garantindo a precisão do dia
    setInterval(updateCountdown, 1000 * 60 * 60 * 24);

    // Tentar tocar a música automaticamente ao carregar
    // ATENÇÃO: Navegadores modernos podem bloquear o autoplay de áudio
    magalAudio.play()
        .then(() => {
            // Se o autoplay funcionar, muda o texto do botão e dispara o confetti
            playMagalButton.textContent = '🔊 Magal está no ar! 🎶';
            triggerConfetti(); 
        })
        .catch(error => {
            // Se o autoplay for bloqueado, exibe um aviso no console
            console.warn("Autoplay do Magal bloqueado. Usuário precisará interagir. Erro:", error);
            // O botão permanecerá com o texto original, esperando o clique
        });

    // Event listener para o botão, que funcionará como um fallback caso o autoplay seja bloqueado
    playMagalButton.addEventListener('click', () => {
        if (magalAudio.paused) {
            magalAudio.play()
                .then(() => {
                    playMagalButton.textContent = '🔊 Magal está no ar! 🎶';
                    triggerConfetti();
                })
                .catch(error => {
                    console.error("Erro ao tentar tocar a música após clique: ", error);
                    alert("Ops! O Magal não quis tocar! Tente recarregar a página ou verifique as permissões de áudio.");
                });
        } else {
            magalAudio.pause();
            playMagalButton.textContent = '💥 Aperte aqui para o Magal invadir! 💥';
        }
    });

    // Função para gerar confetti (chamada quando a música toca)
    function triggerConfetti() {
        for (let i = 0; i < 50; i++) { // Cria 50 pedaços de confetti
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            // Posição horizontal aleatória na tela
            confetti.style.left = Math.random() * 100 + 'vw'; 
            // Atraso aleatório para que caiam em momentos diferentes
            confetti.style.animationDelay = Math.random() * 2 + 's'; 
            // Cor aleatória para cada confetti
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; 
            document.body.appendChild(confetti);

            // Remove o confetti depois que ele cai para não sobrecarregar o DOM
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
});