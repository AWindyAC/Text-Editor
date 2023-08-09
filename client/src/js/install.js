const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Hide our user interface that shows our A2HS button
    const promptEvent = window.deferredPrompt;
    if (!promptEvent ||!navigator.serviceWorker){
        return alert("This browser doesn't support service workers");
    }
    else{
        console.log(promptEvent, "this is my prompt")
        await promptEvent.prompt();
        await promptEvent.userChoice
        .then((choiceResult)=>{
            switch(choiceResult.outcome){
                    case 'accepted':
                        console.log(`User accepted the install prompt`);
                    break;
                    case'rejected':
                        console.log(`User dismissed the install prompt`);
                    break;
                };
        });
    };
    window.deferredPrompt=null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
