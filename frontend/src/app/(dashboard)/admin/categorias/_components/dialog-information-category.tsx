'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsCategory from './form-fields-category'
import { categories } from '@/types/categories'
import SkeletonFormFieldsCategory from './form-fields-category'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationCategoryProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationCategory({
  id,
  children,
}: DialogInformationCategoryProps) {
  const [category, setCategory] = useState<categories | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const  { response, error } = await api('GET', `/category/${id}`)

      if (response) {
        setCategory(response as categories)
      } else {
        setCategory(null)
        toast({
          title: 'Categoria não encontrada!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setCategory(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações da categoria</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas da categoria abaixo.
          </DialogDescription>
        </DialogHeader>
        {category ? (
          <FormFieldsCategory category={category} readOnly />
        ) : (
          <SkeletonFormFieldsCategory readOnly />
        )}
      </DialogContent>
    </Dialog>
  )
}
