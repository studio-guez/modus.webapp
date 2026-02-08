import {ApiPowerBIResponse, IApiMenus, IApiPage, IApiProjects} from "~/composable/adminApi/apiDefinitions";

const baseUrl = 'https://modus-admin.sdrvl.ch/'
// const baseUrl = 'http://localhost:8000/'

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
