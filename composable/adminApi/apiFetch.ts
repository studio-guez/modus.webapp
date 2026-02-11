import {ApiPowerBIResponse, IApiMenus, IApiPage, IApiProjects} from "~/composable/adminApi/apiDefinitions";

function getBaseUrl(): string {
    const config = useRuntimeConfig()
    const url = config.public.apiBaseUrl as string
    return url.endsWith('/') ? url : url + '/'
}

export async function ApiFetchPage(apiPath: string): Promise<IApiPage> {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPage_powerBiSubPage(apiPath: string): Promise<IApiPage> {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPagePowerBIPage(apiPath: string): Promise<ApiPowerBIResponse> {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchProjects(apiPath: string): Promise<IApiProjects> {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPagesInfo() {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}pages-info.json`)).json())
}

export async function ApiFetchMenus(): Promise<IApiMenus> {
    const baseUrl = getBaseUrl()
    return ((await fetch(`${baseUrl}menus.json`)).json())
}
