declare global {
    interface Window {
        MkeConfig: {
            api: {
                protocol: string;
                url: string;
            };
        };
    }
}

const mkeConfig = {
    api: {
        protocol: "http",
        url: "127.0.0.1:5220/api",
    }
};

window.MkeConfig = mkeConfig;
