import { Server } from './Server';
import { serverConfigs } from './configs';
import './controllers';


Server
    .getApp()
    .listen(serverConfigs.port, (): void => {
        console.log(`Listening at http://localhost:${serverConfigs.port}`);
    });