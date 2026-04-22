import {Client as WorkFlowClient} from "@upstash/workflow";
import {QSTASH_URL, QSTASH_TOKEN} from "./env.js";

export const qstashClient = new WorkFlowClient({
    url: QSTASH_URL,
    token: QSTASH_TOKEN
});