// document.addEventListener('DOMContentLoaded', () => {
//     const progressBar = document.getElementById('progress-bar');
//     const targetZone = document.getElementById('target-zone');
//     const result = document.getElementById('result');
//     const backgroundContainer = document.querySelector('.background-container');

//     let interval;
//     let hitsRequired = 1; // Número de acertos necessários para ganhar
//     let currentHits = 0;
//     let speeds = [0.9]; // Velocidades por etapa
//     let successEvent = 'minigameSuccess';
//     let failEvent = 'minigameFail';
//     let animationTimeout;

//     function startGame() {
//         clearInterval(interval);
//         clearTimeout(animationTimeout);
//         result.textContent = '';
//         progressBar.style.animation = `progressAnimation ${speeds[currentHits]}s linear`;
//         progressBar.style.backgroundColor = '#d60000ab';
//         targetZone.style.backgroundColor = '#ffffff';

//         // Posicionar o alvo aleatoriamente da metade para o final do contêiner
//         const containerWidth = document.querySelector('.progress-container').clientWidth;
//         const targetMinPosition = containerWidth / 2;
//         const targetMaxPosition = containerWidth - targetZone.clientWidth;
//         const targetPosition = Math.random() * (targetMaxPosition - targetMinPosition) + targetMinPosition;
//         targetZone.style.left = `${targetPosition}px`;

//         interval = setInterval(checkPosition, 10);

//         // Verificar se a animação terminou sem acerto
//         animationTimeout = setTimeout(() => {
//             if (progressBar.style.animation !== 'none') {
//                 failMinigame();
//             }
//         }, speeds[currentHits] * 1000);
//     }

//     function checkPosition() {
//         document.addEventListener('keydown', handleKeyPress);
//     }

//     function handleKeyPress(event) {
//         if (event.key === 'E' || event.key === 'e') {
//             const progressBarRect = progressBar.getBoundingClientRect();
//             const targetZoneRect = targetZone.getBoundingClientRect();
//             const containerRect = document.querySelector('.progress-container').getBoundingClientRect();
//             if (
//                 progressBarRect.left <= targetZoneRect.left &&
//                 progressBarRect.right >= targetZoneRect.right
//             ) {
//                 // Barra de progresso e zona alvo ficam ligeiramente verdes ao acertar
//                 progressBar.style.backgroundColor = '#66cc66'; // Verde claro
//                 targetZone.style.backgroundColor = '#66cc66'; // Verde claro
//                 currentHits++;
//                 clearTimeout(animationTimeout); // Clear the fail timeout to prevent failure after a successful hit
//                 if (currentHits >= hitsRequired) {
//                     progressBar.style.backgroundColor = '#00910c';
//                     targetZone.style.backgroundColor = '#00910c';
//                     progressBar.style.animation = 'none';
//                     progressBar.style.left = `${targetZoneRect.left - containerRect.left}px`;
//                     setTimeout(() => {
//                         fetch(`https://${GetParentResourceName()}/closeMinigame`, {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json; charset=UTF-8',
//                             },
//                             body: JSON.stringify({ success: true, successEvent, failEvent })
//                         }).then(resp => resp.json()).then(resp => {
//                             backgroundContainer.style.display = 'none';
//                             result.textContent = ''; // Limpa o resultado
//                             progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
//                             targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
//                             progressBar.style.animation = ''; // Remove a animação
//                             progressBar.style.left = '0'; // Redefine a posição
//                         }).catch(error => console.log('Error:', error));
//                     }, 2000); // Tempo para mostrar o sucesso antes de fechar
//                 } else {
//                     // Próxima fase sem reiniciar imediatamente, permitindo a cor verde claro ser visível
//                     progressBar.style.animation = 'none'; // Para a animação para evitar reset durante a transição
//                     setTimeout(startGame, 500);
//                 }
//             }
//         }
//     }

//     function failMinigame() {
//         targetZone.style.backgroundColor = '#ff0000';
//         clearInterval(interval);
//         clearTimeout(animationTimeout);
//         progressBar.style.animation = 'none';
//         setTimeout(() => {
//             fetch(`https://${GetParentResourceName()}/closeMinigame`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 },
//                 body: JSON.stringify({ success: false, successEvent, failEvent })
//             }).then(resp => resp.json()).then(resp => {
//                 backgroundContainer.style.display = 'none';
//                 result.textContent = ''; // Limpa o resultado
//                 progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
//                 targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
//                 progressBar.style.animation = ''; // Remove a animação
//                 progressBar.style.left = '0'; // Redefine a posição
//             }).catch(error => console.log('Error:', error));
//         }, 1500); // Tempo para mostrar a falha antes de fechar
//     }

//     window.addEventListener('message', function(event) {
//         if (event.data.action === "openMinigame") {
//             hitsRequired = event.data.hits || 1;
//             speeds = event.data.speeds || [0.9];
//             successEvent = event.data.successEvent || 'minigameSuccess';
//             failEvent = event.data.failEvent || 'minigameFail';
//             currentHits = 0;
//             backgroundContainer.style.display = 'flex';
//             startGame();
//         } else if (event.data.action === "closeMinigame") {
//             backgroundContainer.style.display = 'none';
//             clearInterval(interval);
//             clearTimeout(animationTimeout);
//             result.textContent = ''; // Limpa o resultado
//             progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
//             targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
//             progressBar.style.animation = ''; // Remove a animação
//             progressBar.style.left = '0'; // Redefine a posição
//         }
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const targetZone = document.getElementById('target-zone');
    const result = document.getElementById('result');
    const backgroundContainer = document.querySelector('.background-container');

    let interval;
    let hitsRequired = 1; // Número de acertos necessários para ganhar
    let currentHits = 0;
    let speeds = [0.9]; // Velocidades por etapa
    let successEvent = 'minigameSuccess';
    let failEvent = 'minigameFail';
    let animationTimeout;

    function startGame() {
        clearInterval(interval);
        clearTimeout(animationTimeout);
        result.textContent = '';
        progressBar.style.animation = `progressAnimation ${speeds[currentHits]}s linear`;
        progressBar.style.backgroundColor = '#d60000ab';
        targetZone.style.backgroundColor = '#ffffff';

        // Posicionar o alvo aleatoriamente da metade para o final do contêiner
        const containerWidth = document.querySelector('.progress-container').clientWidth;
        const targetMinPosition = containerWidth / 2;
        const targetMaxPosition = containerWidth - targetZone.clientWidth;
        const targetPosition = Math.random() * (targetMaxPosition - targetMinPosition) + targetMinPosition;
        targetZone.style.left = `${targetPosition}px`;

        interval = setInterval(checkPosition, 10);

        // Verificar se a animação terminou sem acerto
        animationTimeout = setTimeout(() => {
            if (progressBar.style.animation !== 'none') {
                failMinigame();
            }
        }, speeds[currentHits] * 1000);
    }

    function checkPosition() {
        document.addEventListener('keydown', handleKeyPress);
    }

    function handleKeyPress(event) {
        if (event.key === 'E' || event.key === 'e') {
            const progressBarRect = progressBar.getBoundingClientRect();
            const targetZoneRect = targetZone.getBoundingClientRect();
            const containerRect = document.querySelector('.progress-container').getBoundingClientRect();
            if (
                progressBarRect.left <= targetZoneRect.left &&
                progressBarRect.right >= targetZoneRect.right
            ) {
                // Barra de progresso e zona alvo ficam ligeiramente verdes ao acertar
                progressBar.style.backgroundColor = '#66cc66'; // Verde claro
                targetZone.style.backgroundColor = '#66cc66'; // Verde claro
                currentHits++;
                clearTimeout(animationTimeout); // Clear the fail timeout to prevent failure after a successful hit
                document.removeEventListener('keydown', handleKeyPress); // Remover o ouvinte de evento após a detecção
                if (currentHits >= hitsRequired) {
                    progressBar.style.backgroundColor = '#00910c';
                    targetZone.style.backgroundColor = '#00910c';
                    progressBar.style.animation = 'none';
                    progressBar.style.left = `${targetZoneRect.left - containerRect.left}px`;
                    setTimeout(() => {
                        fetch(`https://${GetParentResourceName()}/closeMinigame`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json; charset=UTF-8',
                            },
                            body: JSON.stringify({ success: true, successEvent, failEvent })
                        }).then(resp => resp.json()).then(resp => {
                            backgroundContainer.style.display = 'none';
                            result.textContent = ''; // Limpa o resultado
                            progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
                            targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
                            progressBar.style.animation = ''; // Remove a animação
                            progressBar.style.left = '0'; // Redefine a posição
                        }).catch(error => console.log('Error:', error));
                    }, 2000); // Tempo para mostrar o sucesso antes de fechar
                } else {
                    // Próxima fase sem reiniciar imediatamente, permitindo a cor verde claro ser visível
                    progressBar.style.animation = 'none'; // Para a animação para evitar reset durante a transição
                    setTimeout(startGame, 500);
                }
            } else {
                failMinigame(); // Chamar a falha do minigame se o jogador não acertar o alvo
            }
        }
    }

    function failMinigame() {
        targetZone.style.backgroundColor = '#ff0000';
        clearInterval(interval);
        clearTimeout(animationTimeout);
        document.removeEventListener('keydown', handleKeyPress);
        progressBar.style.animation = 'none';
        setTimeout(() => {
            fetch(`https://${GetParentResourceName()}/closeMinigame`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ success: false, successEvent, failEvent })
            }).then(resp => resp.json()).then(resp => {
                backgroundContainer.style.display = 'none';
                result.textContent = ''; // Limpa o resultado
                progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
                targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
                progressBar.style.animation = ''; // Remove a animação
                progressBar.style.left = '0'; // Redefine a posição
            }).catch(error => console.log('Error:', error));
        }, 1500); // Tempo para mostrar a falha antes de fechar
    }

    window.addEventListener('message', function(event) {
        if (event.data.action === "openMinigame") {
            hitsRequired = event.data.hits || 1;
            speeds = event.data.speeds || [0.9];
            successEvent = event.data.successEvent || 'minigameSuccess';
            failEvent = event.data.failEvent || 'minigameFail';
            currentHits = 0;
            backgroundContainer.style.display = 'flex';
            startGame();
        } else if (event.data.action === "closeMinigame") {
            backgroundContainer.style.display = 'none';
            clearInterval(interval);
            clearTimeout(animationTimeout);
            document.removeEventListener('keydown', handleKeyPress);
            result.textContent = ''; // Limpa o resultado
            progressBar.style.backgroundColor = '#d60000ab'; // Redefine a cor inicial
            targetZone.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Redefine a cor inicial
            progressBar.style.animation = ''; // Remove a animação
            progressBar.style.left = '0'; // Redefine a posição
        }
    });
});
