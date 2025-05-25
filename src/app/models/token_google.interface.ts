export interface TokenGoogle {
    id: number;
    token: string;
    scadenza_token: number;
    refresh_token: string;
    scadenza_refresh_token: number;
    scope: string;
    tipo_token: string;
    timestamp_creazione: {
        day: number;
        month: number;
        year: number;
        hour: number;
        minute: number;
        second: number;
        millisecond: number
    };
}
