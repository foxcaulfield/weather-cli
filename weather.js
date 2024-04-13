#!/usr/bin/env node --no-warnings=ExperimentalWarning

import { App } from "./services/app.service.js";

const app = new App();
app.init();