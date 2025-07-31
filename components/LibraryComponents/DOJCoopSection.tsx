'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Edit, Trash2 } from 'lucide-react'
import type { DOJHMO } from '@/interface/doj-coop'

export function DOJHMOSection() {
  const [dojHmos, setDojHmos] = useState<DOJHMO[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedDOJHMO, setSelectedDOJHMO] = useState<DOJHMO | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: '',
    status: ''
  })

  useEffect(() => {
    fetchDOJHMOs()
  }, [])

  const fetchDOJHMOs = async () => {
    try {
      const response = await fetch('/api/doj-coop')
      if (response.ok) {
        const data = await response.json()
        setDojHmos(data)
      }
    } catch (error) {
      console.error('Error fetching DOJ HMOs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddDOJHMO = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/doj-coop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setAddModalOpen(false)
        setFormData({ name: '', code: '', description: '', type: '', status: '' })
        fetchDOJHMOs()
      }
    } catch (error) {
      console.error('Error adding DOJ HMO:', error)
    }
  }

  const handleEditDOJHMO = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDOJHMO) return
    try {
      const response = await fetch(`/api/doj-coop/${selectedDOJHMO.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setEditModalOpen(false)
        setSelectedDOJHMO(null)
        setFormData({ name: '', code: '', description: '', type: '', status: '' })
        fetchDOJHMOs()
      }
    } catch (error) {
      console.error('Error updating DOJ HMO:', error)
    }
  }

  const handleDeleteDOJHMO = async (dojHmoId: string) => {
    if (!confirm('Are you sure you want to delete this DOJ HMO?')) return
    try {
      const response = await fetch(`/api/doj-coop/${dojHmoId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        fetchDOJHMOs()
      }
    } catch (error) {
      console.error('Error deleting DOJ HMO:', error)
    }
  }

  const openEditModal = (dojHmo: DOJHMO) => {
    setSelectedDOJHMO(dojHmo)
    setFormData({
      name: dojHmo.name,
      code: dojHmo.code,
      description: dojHmo.description || '',
      type: dojHmo.type || '',
      status: dojHmo.status || ''
    })
    setEditModalOpen(true)
  }

  const filteredDOJHMOs = dojHmos.filter(dojHmo =>
    dojHmo.name.toLowerCase().includes(search.toLowerCase()) ||
    dojHmo.code.toLowerCase().includes(search.toLowerCase()) ||
    (dojHmo.description && dojHmo.description.toLowerCase().includes(search.toLowerCase()))
  )

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div>Loading DOJ HMOs...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">DOJ HMO Management</h2>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add DOJ HMO
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New DOJ HMO</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDOJHMO} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Health, Dental, Vision, etc."
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Add DOJ HMO
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search DOJ HMOs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All DOJ HMOs ({filteredDOJHMOs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDOJHMOs.map(dojHmo => (
                <TableRow key={dojHmo.id}>
                  <TableCell>{dojHmo.id}</TableCell>
                  <TableCell className="font-medium">{dojHmo.name}</TableCell>
                  <TableCell>{dojHmo.code}</TableCell>
                  <TableCell>{dojHmo.description || '-'}</TableCell>
                  <TableCell>{dojHmo.type || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={dojHmo.status === 'Active' ? 'default' : 'secondary'}>
                      {dojHmo.status || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(dojHmo.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(dojHmo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDOJHMO(dojHmo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredDOJHMOs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No DOJ HMOs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit DOJ HMO</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditDOJHMO} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-code">Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Type</Label>
              <Input
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., Health, Dental, Vision, etc."
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                Update DOJ HMO
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 