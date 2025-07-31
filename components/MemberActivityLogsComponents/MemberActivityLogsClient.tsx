'use client'

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Edit, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Member {
  id: string;
  name: string;
}

interface Device {
  id: string;
  name: string;
}

interface MemberActivityLog {
  id: string;
  memberId: string;
  deviceIds: string; // JSON string
  description: string | null;
  timeIn: Date | null;
  timeOut: Date | null;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  member: Member;
}

interface MemberActivityLogsClientProps {
  initialActivityLogs: MemberActivityLog[];
  initialMembers: Member[];
  initialDevices: Device[];
}

export function MemberActivityLogsClient({ 
  initialActivityLogs, 
  initialMembers, 
  initialDevices 
}: MemberActivityLogsClientProps) {
  const [activityLogs, setActivityLogs] = useState<MemberActivityLog[]>(initialActivityLogs)
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [devices, setDevices] = useState<Device[]>(initialDevices)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLog, setEditingLog] = useState<MemberActivityLog | null>(null)
  const [newLog, setNewLog] = useState({
    memberId: '',
    deviceIds: [] as string[],
    description: '',
    timeIn: '',
    timeOut: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for delete confirmation dialog
  const [logToDelete, setLogToDelete] = useState<string | null>(null); // ID of the log to delete

  // Helper function to parse deviceIds from string to array
  const getDeviceIdsFromString = (deviceIdsString: string): string[] => {
    try {
      return JSON.parse(deviceIdsString) || []
    } catch {
      return []
    }
  }

  // Helper function to get device names from device IDs
  const getDeviceNames = (deviceIdsString: string) => {
    try {
      const deviceIds = JSON.parse(deviceIdsString)
      return deviceIds.map((id: string) => {
        const device = devices.find(d => d.id === id)
        return device?.name || 'Unknown Device'
      })
    } catch {
      return []
    }
  }

  // Filtered logs based on search input
  const filteredLogs = activityLogs.filter(log => {
    const searchTerm = search.toLowerCase();
    const memberName = log.member.name.toLowerCase();
    const description = log.description?.toLowerCase() || '';
    const deviceNames = getDeviceNames(log.deviceIds).map((name: string) => name.toLowerCase());

    return (
      memberName.includes(searchTerm) ||
      description.includes(searchTerm) ||
      deviceNames.some((name: string) => name.includes(searchTerm))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  const handleAddLog = async () => {
    console.log("Attempting to add log with data:", newLog)
    
    if (!newLog.memberId) {
      setError("Please select a member")
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const requestData = {
        memberId: newLog.memberId,
        deviceIds: newLog.deviceIds,
        description: newLog.description || null,
        timeIn: newLog.timeIn || null,
        timeOut: newLog.timeOut || null,
      }
      
      console.log("Sending request data:", requestData)
      
      const response = await fetch("/api/member-activity-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const newLogData = await response.json()
        console.log("Successfully created log:", newLogData)
        setActivityLogs([newLogData, ...activityLogs])
        setNewLog({ memberId: '', deviceIds: [], description: '', timeIn: '', timeOut: '' })
        setIsAddDialogOpen(false)
      } else {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        setError(errorData.error || `Failed to create activity log (${response.status})`)
      }
    } catch (error) {
      console.error("Network error adding activity log:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditLog = async () => {
    if (!editingLog || !editingLog.memberId) {
      setError("Please select a member")
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const requestData = {
        memberId: editingLog.memberId,
        deviceIds: getDeviceIdsFromString(editingLog.deviceIds),
        description: editingLog.description || null,
        timeIn: editingLog.timeIn || null,
        timeOut: editingLog.timeOut || null,
      }
      
      console.log("Sending edit request data:", requestData)
      
      const response = await fetch(`/api/member-activity-logs/${editingLog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      console.log("Edit response status:", response.status)

      if (response.ok) {
        const updatedLog = await response.json()
        console.log("Successfully updated log:", updatedLog)
        setActivityLogs(activityLogs.map(log => 
          log.id === editingLog.id ? updatedLog : log
        ))
        setEditingLog(null)
        setIsEditDialogOpen(false)
      } else {
        const errorData = await response.json()
        console.error("Edit API Error:", errorData)
        setError(errorData.error || `Failed to update activity log (${response.status})`)
      }
    } catch (error) {
      console.error("Network error updating activity log:", error)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setLogToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteLog = async () => {
    if (!logToDelete) return;

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/member-activity-logs/${logToDelete}`, {
        method: "DELETE",
      });

      console.log("Delete response status:", response.status);

      if (response.ok) {
        console.log("Successfully deleted log:", logToDelete);
        setActivityLogs(activityLogs.filter(log => log.id !== logToDelete));
        setIsDeleteDialogOpen(false);
        setLogToDelete(null);
      } else {
        const errorData = await response.json();
        console.error("Delete API Error:", errorData);
        setError(errorData.error || `Failed to delete activity log (${response.status})`);
      }
    } catch (error) {
      console.error("Network error deleting activity log:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (log: MemberActivityLog) => {
    setEditingLog({ ...log })
    setIsEditDialogOpen(true)
  }

  const handleDeviceToggle = (deviceId: string, isChecked: boolean) => {
    if (isChecked) {
      setNewLog(prev => ({
        ...prev,
        deviceIds: [...prev.deviceIds, deviceId]
      }))
    } else {
      setNewLog(prev => ({
        ...prev,
        deviceIds: prev.deviceIds.filter(id => id !== deviceId)
      }))
    }
  }

  const handleEditDeviceToggle = (deviceId: string, isChecked: boolean) => {
    if (!editingLog) return

    const currentDeviceIds = getDeviceIdsFromString(editingLog.deviceIds)
    
    if (isChecked) {
      // Add device
      const newDeviceIds = [...currentDeviceIds, deviceId]
      setEditingLog(prev => ({
        ...prev!,
        deviceIds: JSON.stringify(newDeviceIds)
      }))
    } else {
      // Remove device
      const newDeviceIds = currentDeviceIds.filter(id => id !== deviceId)
      setEditingLog(prev => ({
        ...prev!,
        deviceIds: JSON.stringify(newDeviceIds)
      }))
    }
  }

  const removeDeviceFromNew = (deviceId: string) => {
    setNewLog(prev => ({
      ...prev,
      deviceIds: prev.deviceIds.filter(id => id !== deviceId)
    }))
  }

  const removeDeviceFromEdit = (deviceId: string) => {
    if (!editingLog) return
    
    const currentDeviceIds = getDeviceIdsFromString(editingLog.deviceIds)
    const newDeviceIds = currentDeviceIds.filter(id => id !== deviceId)
    
    setEditingLog(prev => ({
      ...prev!,
      deviceIds: JSON.stringify(newDeviceIds)
    }))
  }

  const formatDateTime = (date: Date | null) => {
    if (!date) return "Not set"
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Member Activity Logs</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity Log
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Activity Log</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                
                <div>
                  <Label htmlFor="member">Member *</Label>
                  <Select
                    value={newLog.memberId}
                    onValueChange={(value) => setNewLog({ ...newLog, memberId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Devices Used</Label>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                    {devices.map((device) => (
                      <div key={device.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`device-${device.id}`}
                          checked={newLog.deviceIds.includes(device.id)}
                          onCheckedChange={(checked) => 
                            handleDeviceToggle(device.id, checked as boolean)
                          }
                        />
                        <label htmlFor={`device-${device.id}`} className="text-sm">
                          {device.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {newLog.deviceIds.length > 0 && (
                    <div className="mt-2">
                      <Label className="text-sm text-muted-foreground">Selected Devices:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {newLog.deviceIds.map(deviceId => {
                          const device = devices.find(d => d.id === deviceId)
                          return (
                            <Badge key={deviceId} variant="secondary" className="text-xs">
                              {device?.name}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                onClick={() => removeDeviceFromNew(deviceId)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newLog.description}
                    onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                    placeholder="Enter activity description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeIn">Time In</Label>
                    <Input
                      id="timeIn"
                      type="datetime-local"
                      value={newLog.timeIn}
                      onChange={(e) => setNewLog({ ...newLog, timeIn: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeOut">Time Out</Label>
                    <Input
                      id="timeOut"
                      type="datetime-local"
                      value={newLog.timeOut}
                      onChange={(e) => setNewLog({ ...newLog, timeOut: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLog} disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Log"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No activity logs found matching your search criteria.</p>
              {search && <p className="text-sm mt-2">Try adjusting your search or adding new logs.</p>}
              {!search && <p className="text-sm mt-2">Click "Add Activity Log" to get started.</p>}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">No.</TableHead> {/* Added new TableHead for numbering */}
                      <TableHead className="min-w-[120px]">Member</TableHead>
                      <TableHead className="min-w-[150px]">Devices Used</TableHead>
                      <TableHead className="min-w-[200px]">Description</TableHead>
                      <TableHead className="min-w-[150px]">Time In</TableHead>
                      <TableHead className="min-w-[150px]">Time Out</TableHead>
                      <TableHead className="min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentLogs.map((log, index) => { {/* Added index to map function */}
                      const deviceNames = getDeviceNames(log.deviceIds)
                      const logNumber = indexOfFirstItem + index + 1; // Calculate the log number
                      return (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{logNumber}</TableCell> {/* Display the log number */}
                          <TableCell className="font-medium">{log.member.name}</TableCell>
                          <TableCell>
                            {deviceNames.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {deviceNames.map((deviceName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {deviceName}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No devices</span>
                            )}
                          </TableCell>
                          <TableCell>{log.description || "No description"}</TableCell>
                          <TableCell>{formatDateTime(log.timeIn)}</TableCell>
                          <TableCell>{formatDateTime(log.timeOut)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(log)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClick(log.id)} // Use handleDeleteClick
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-end items-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Activity Log</DialogTitle>
          </DialogHeader>
          {editingLog && (
            <div className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <Label htmlFor="edit-member">Member *</Label>
                <Select
                  value={editingLog.memberId}
                  onValueChange={(value) => setEditingLog({ ...editingLog, memberId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Devices Used</Label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-device-${device.id}`}
                        checked={getDeviceIdsFromString(editingLog.deviceIds).includes(device.id)}
                        onCheckedChange={(checked) => 
                          handleEditDeviceToggle(device.id, checked as boolean)
                        }
                      />
                      <label htmlFor={`edit-device-${device.id}`} className="text-sm">
                        {device.name}
                      </label>
                    </div>
                  ))}
                </div>
                {getDeviceIdsFromString(editingLog.deviceIds).length > 0 && (
                  <div className="mt-2">
                    <Label className="text-sm text-muted-foreground">Selected Devices:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getDeviceIdsFromString(editingLog.deviceIds).map(deviceId => {
                        const device = devices.find(d => d.id === deviceId)
                        return (
                          <Badge key={deviceId} variant="secondary" className="text-xs">
                            {device?.name}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                              onClick={() => removeDeviceFromEdit(deviceId)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingLog.description || ""}
                  onChange={(e) => setEditingLog({ ...editingLog, description: e.target.value })}
                  placeholder="Enter activity description"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-timeIn">Time In</Label>
                  <Input
                    id="edit-timeIn"
                    type="datetime-local"
                    value={editingLog.timeIn ? new Date(editingLog.timeIn).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditingLog({ ...editingLog, timeIn: e.target.value ? new Date(e.target.value) : null })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-timeOut">Time Out</Label>
                  <Input
                    id="edit-timeOut"
                    type="datetime-local"
                    value={editingLog.timeOut ? new Date(editingLog.timeOut).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditingLog({ ...editingLog, timeOut: e.target.value ? new Date(e.target.value) : null })}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditLog} disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Log"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this activity log? This action cannot be undone.</p>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteLog} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
