import { SetMetadata } from "@nestjs/common";

export interface CacheOptions {
    key: string;
    ttl: number
}

export function Cachable(cacheValues: CacheOptions) {
    return SetMetadata('cache', cacheValues);
}