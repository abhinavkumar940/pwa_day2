const publicVapidKey = 'BOhEa3poaObVoG837QxrCWo7sKUL4L7pfI6ypySv5ZEzKAFV3xLOFSChLfL9BbNnCn6Ltws4xZ1OBSOBLhUpsEY';

if (navigator.serviceWorker) {
    console.log("Service worker is supported");
    window.addEventListener("load", function () {
        console.log("window is loaded");
        navigator.serviceWorker.register("/sw_swr.js").then(register => {
            console.log("Service worker registered successfuly: ", register);
        })
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.group === "network") {
            if (event.data.status === 0) {
                alert("network is offline");
            }

        }
    });

    navigator.serviceWorker.ready.then(async (registration) => {
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: (publicVapidKey),
        });

        console.log({ subscription })
    })
} else {
    console.log("Service worker is not supported");
}

