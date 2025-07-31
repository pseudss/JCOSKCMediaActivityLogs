import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { DeviceDeviceDistinction } from "@/prisma/generated";

interface DeviceDistinction {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export function DeviceDistinctionSection() {
  const [deviceDistinctions, setDeviceDistinctions] = useState<DeviceDistinction[]>([]);
  const [filteredDeviceDistinctions, setFilteredDeviceDistinctions] = useState<DeviceDistinction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDeviceDistinction, setEditingDeviceDistinction] = useState<DeviceDistinction | null>(null);
  const [newDeviceDistinction, setNewDeviceDistinction] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchDeviceDistinctions();
  }, []);

  const fetchDeviceDistinctions = async () => {
    try {
      const response = await fetch("/api/device-distinctions");
      if (response.ok) {
        const data = await response.json();
        setDeviceDistinctions(data);
      } else {
        setDeviceDistinctions([]);
      }
    } catch (error) {
      setDeviceDistinctions([]);
    }
  };
  useEffect(() => {
    const filtered = deviceDistinctions.filter((deviceDistinction) =>
      deviceDistinction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDeviceDistinctions(filtered);
    setCurrentPage(1);
  }, [searchTerm, deviceDistinctions]);



  const handleAddDeviceDistinction = async () => {
    if (newDeviceDistinction.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/device-distinctions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newDeviceDistinction.name.trim(),
            description: newDeviceDistinction.description.trim() || null,
          }),
        });

        if (response.ok) {
          const newDeviceDistinctionData = await response.json();
          setDeviceDistinctions([newDeviceDistinctionData, ...deviceDistinctions]);
          setNewDeviceDistinction({ name: "", description: "" });
          setIsAddDialogOpen(false);
        }
      } catch (error) {
        console.error("Error adding device distinction:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditDeviceDistinction = async () => {
    if (editingDeviceDistinction && editingDeviceDistinction.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/device-distinctions/${editingDeviceDistinction.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editingDeviceDistinction.name.trim(),
            description: editingDeviceDistinction.description?.trim() || null,
          }),
        });

        if (response.ok) {
          const updatedDeviceDistinction = await response.json();
          setDeviceDistinctions(deviceDistinctions.map(dd => dd.id === updatedDeviceDistinction.id ? updatedDeviceDistinction : dd));
          setEditingDeviceDistinction(null);
          setIsEditDialogOpen(false);
        }
      } catch (error) {
        console.error("Error updating device distinction:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteDeviceDistinction = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/device-distinctions/${id}`, { method: "DELETE" });
      if (response.ok) {
        setDeviceDistinctions(deviceDistinctions.filter(dd => dd.id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (dd: DeviceDistinction) => {
    setEditingDeviceDistinction({ ...dd });
    setIsEditDialogOpen(true);
  };

  const toggleDescription = (id: string) => {
    const newExpanded = new Set(expandedDescriptions);
    newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
    setExpandedDescriptions(newExpanded);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deviceDistinctions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(deviceDistinctions.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Device Distinction Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Device Distinction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Device Distinction</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="device-distinction-name">Device Distinction Name</Label>
                <Input id="device-distinction-name" value={newDeviceDistinction.name} onChange={(e) => setNewDeviceDistinction({ ...newDeviceDistinction, name: e.target.value })} placeholder="Enter device distinction name" />
              </div>
              <div>
                <Label htmlFor="device-distinction-description">Description</Label>
                <Textarea id="device-distinction-description" value={newDeviceDistinction.description} onChange={(e) => setNewDeviceDistinction({ ...newDeviceDistinction, description: e.target.value })} placeholder="Enter device distinction description" rows={6} className="min-h-[120px] resize-y" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddDeviceDistinction} disabled={isLoading}>{isLoading ? "Adding..." : "Add Device Distinction"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>Device Distinction List</CardTitle></CardHeader>
        <CardContent>
          {deviceDistinctions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No device distinctions found.</p>
              <p className="text-sm mt-2">Click "Add Device Distinction" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentItems.map(deviceDistinction => (
                <div key={deviceDistinction.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{deviceDistinction.name}</h3>
                    <div className="mt-1">
                      {deviceDistinction.description && deviceDistinction.description.length > 150 ? (
                        <>
                          <p className={`text-sm text-muted-foreground whitespace-pre-wrap break-words ${!expandedDescriptions.has(deviceDistinction.id) ? 'max-h-12 overflow-hidden' : ''}`}>{deviceDistinction.description}</p>
                          <Button variant="link" size="sm" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-800 mt-1" onClick={() => toggleDescription(deviceDistinction.id)}>
                            {expandedDescriptions.has(deviceDistinction.id) ? (<>Show less <ChevronUp className="h-3 w-3 ml-1" /></>) : (<>Show more <ChevronDown className="h-3 w-3 ml-1" /></>)}
                          </Button>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words">{deviceDistinction.description || "No description"}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(deviceDistinction)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteDeviceDistinction(deviceDistinction.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}


 <div className="flex justify-end mt-6 space-x-2 items-center">
  <Button
    size="sm"
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}>
    Previous
  </Button>
  <span className="text-sm self-center">
    Page {currentPage} of {totalPages}
  </span>
  <Button
    size="sm"
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}>
    Next
  </Button>
</div>


            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Device Distinction</DialogTitle></DialogHeader>
          {editingDeviceDistinction && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-device-distinction-name">Device Distinction Name</Label>
                <Input id="edit-device-distinction-name" value={editingDeviceDistinction.name} onChange={(e) => setEditingDeviceDistinction({ ...editingDeviceDistinction, name: e.target.value })} placeholder="Enter device distinction name" />
              </div>
              <div>
                <Label htmlFor="edit-device-distinction-description">Description</Label>
                <Textarea id="edit-device-distinction-description" value={editingDeviceDistinction.description || ""} onChange={(e) => setEditingDeviceDistinction({ ...editingDeviceDistinction, description: e.target.value })} placeholder="Enter device distinction description" rows={6} className="min-h-[120px] resize-y" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleEditDeviceDistinction} disabled={isLoading}>{isLoading ? "Saving..." : "Save Changes"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
