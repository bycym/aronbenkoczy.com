interface ImportMetaEnv {
  // TODO build check for envs
  readonly PUBLIC_LAST_FM_API_KEY: string
  readonly PUBLIC_LAST_FM_USER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
