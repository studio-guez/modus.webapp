import {ApiPowerBIResponse, IApiMenus, IApiPage, IApiProjects} from "~/composable/adminApi/apiDefinitions";

// In Docker, use host.docker.internal to reach host machine
// In browser, use localhost since browser runs on host
const baseUrl = import.meta.env.DEV 
    ? 'http://localhost:8080/' 
    : 'https://cms-staging.modus-ge.ch/'

export async function ApiFetchPage(apiPath: string): Promise<IApiPage> {
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPage_powerBiSubPage(apiPath: string): Promise<IApiPage> {
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPagePowerBIPage(apiPath: string): Promise<ApiPowerBIResponse> {
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchProjects(apiPath: string): Promise<IApiProjects> {
    return ((await fetch(`${baseUrl}${apiPath}.json`)).json())
}

export async function ApiFetchPagesInfo() {
    return ((await fetch(`${baseUrl}pages-info.json`)).json())
}

export async function ApiFetchMenus(): Promise<IApiMenus> {
    return ((await fetch(`${baseUrl}menus.json`)).json())
}
