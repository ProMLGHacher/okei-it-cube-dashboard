
export interface Student {
    id: number,
    fullname: string,
    fullnameParent: string,
    numberParent: string,
    isExcluded: boolean,
    wasPresent?: boolean | undefined,
    reason?: string | undefined
}