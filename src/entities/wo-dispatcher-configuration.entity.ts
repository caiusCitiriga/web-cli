import { WOFlag } from './wo-flag.entity';

export class WODispatcherConfiguration {
    command: string;
    desc: string;
    aliases?: string[];
    flags?: WOFlag[];
    action: (flags: string[]) => void
}
