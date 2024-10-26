export {}

declare global {
    interface CustomJwtSessionClaims {
        roleMetadata: {
            role: string
        }
    }
}
