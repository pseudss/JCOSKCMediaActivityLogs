'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { Member } from '@/interface/member'

interface EditMemberModalProps {
  member: Member
  onMemberUpdated?: () => void
  onMemberDeleted?: () => void
  trigger?: React.ReactNode
}

export function EditMemberModal({ member, onMemberUpdated, onMemberDeleted, trigger }: EditMemberModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const router = useRouter()

  // Initialize form data when member changes
  useEffect(() => {
    setFormData({
      name: member.name,
      description: member.description || ''
    })
  }, [member])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/member/${member.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setOpen(false)
        onMemberUpdated?.()
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to update member')
      }
    } catch (error) {
      console.error('Error updating member:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this member? This action cannot be undone.')) {
      return
    }

    setDeleteLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/member/${member.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setOpen(false)
        onMemberDeleted?.()
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to delete member')
      }
    } catch (error) {
      console.error('Error deleting member:', error)
      setError('Network error. Please try again.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        name: member.name,
        description: member.description || ''
      })
      setError('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter member name"
              required
              disabled={loading || deleteLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Position</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter member position (optional)"
              rows={3}
              disabled={loading || deleteLoading}
            />
          </div>
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading || deleteLoading}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </Button>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading || deleteLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || deleteLoading || !formData.name.trim()}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? 'Updating...' : 'Update Member'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 