'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/artigo', { data: form })

    if (!res.error) {
        revalidatePath('/admin/artigos')
    }

    return JSON.stringify(res);
}

export async function updateSportsItem(form: FormData) {
    const res = await api('POST', `/artigo/${form.get('id')}`, {
        data: form,
    })

    if (!res.error) {
        revalidatePath('/admin/artigos')
    }

    return JSON.stringify(res);
}

export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/artigo/${id}`)

    if (!res.error) {
        revalidatePath('/admin/artigos')
    }

    return JSON.stringify(res);
}
