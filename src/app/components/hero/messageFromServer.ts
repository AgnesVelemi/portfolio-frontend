export interface MessageFromServer {
    payload: string;
    when: string; // ISO 8601 format "2026-02-18T08:12:28+01:00"  OffsetDateTime.now();
}
