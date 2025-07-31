import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

interface DeviceDistinction {
  id: string;
  name: string;
  description: string | null;
}

interface DeviceDeviceDistinction {
  id: string;
  deviceDistinction: DeviceDistinction;
}

interface Device {
  id: string;
  name: string;
  description: string | null;
  deviceDistinctions: DeviceDeviceDistinction[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export function DeviceSection() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceDistinctions, setDeviceDistinctions] = useState<DeviceDistinction[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [newDevice, setNewDevice] = useState({ name: "", description: "", deviceDistinctionIds: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // You can change how many devices per page
  const [searchQuery, setSearchQuery] = useState("");


  // Load devices and device distinctions from database on component mount
  useEffect(() => {
    fetchDevices();
    fetchDeviceDistinctions();
  }, []);
  useEffect(() => {
    const filtered = devices.filter((device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevices(filtered);
    setCurrentPage(1);
  }, [searchTerm, devices]);

  const fetchDevices = async () => {
    try {
      const response = await fetch("/api/devices");
      if (response.ok) {
        const data = await response.json();
        setDevices(data);
      } else {
        console.error("Failed to fetch devices");
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const fetchDeviceDistinctions = async () => {
    try {
      const response = await fetch("/api/device-distinctions");
      if (response.ok) {
        const data = await response.json();
        setDeviceDistinctions(data);
      } else {
        console.error("Failed to fetch device distinctions");
      }
    } catch (error) {
      console.error("Error fetching device distinctions:", error);
    }
  };

  const handleAddDevice = async () => {
    if (newDevice.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/devices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newDevice.name.trim(),
            description: newDevice.description.trim() || null,
            deviceDistinctionIds: newDevice.deviceDistinctionIds,
          }),
        });

        if (response.ok) {
          const newDeviceData = await response.json();
          setDevices([newDeviceData, ...devices]);
          setNewDevice({ name: "", description: "", deviceDistinctionIds: [] });
          setIsAddDialogOpen(false);
        } else {
          const error = await response.json();
          console.error("Failed to add device:", error);
        }
      } catch (error) {
        console.error("Error adding device:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditDevice = async () => {
    if (editingDevice && editingDevice.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/devices/${editingDevice.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingDevice.name.trim(),
            description: editingDevice.description?.trim() || null,
          }),
        });

        if (response.ok) {
          const updatedDevice = await response.json();
          setDevices(devices.map(device => 
            device.id === editingDevice.id ? updatedDevice : device
          ));
          setEditingDevice(null);
          setIsEditDialogOpen(false);
        } else {
          const error = await response.json();
          console.error("Failed to update device:", error);
        }
      } catch (error) {
        console.error("Error updating device:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteDevice = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/devices/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDevices(devices.filter(device => device.id !== id));
      } else {
        const error = await response.json();
        console.error("Failed to delete device:", error);
      }
    } catch (error) {
      console.error("Error deleting device:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (device: Device) => {
    setEditingDevice({ ...device });
    setIsEditDialogOpen(true);
  };


  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedMaterials = filteredDevices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
  <div className="space-y-6">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold">Device Management</h2>
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogTrigger asChild>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add Device
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Device</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div>
        <Label htmlFor="device-name">Device Name</Label>
        <Input
          id="device-name"
          value={newDevice.name}
          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
          placeholder="Enter device name"
        />
      </div>
      <div>
        <Label htmlFor="device-description">Description</Label>
        <Textarea
          id="device-description"
          value={newDevice.description}
          onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
          placeholder="Enter device description"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="device-distinctions">Device Distinctions</Label>
        <div className="space-y-2">
          {deviceDistinctions.map((distinction) => (
            <div key={distinction.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`distinction-${distinction.id}`}
                checked={newDevice.deviceDistinctionIds.includes(distinction.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setNewDevice({
                      ...newDevice,
                      deviceDistinctionIds: [...newDevice.deviceDistinctionIds, distinction.id]
                    });
                  } else {
                    setNewDevice({
                      ...newDevice,
                      deviceDistinctionIds: newDevice.deviceDistinctionIds.filter(id => id !== distinction.id)
                    });
                  }
                }}
                className="rounded"
              />
              <label htmlFor={`distinction-${distinction.id}`} className="text-sm">
                {distinction.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleAddDevice} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Device"}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

  </div>

  <Input
    type="text"
    placeholder="Search devices..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="max-w-sm"
  />
      
      <Card>
        <CardHeader>
          <CardTitle>Device List</CardTitle>
        </CardHeader>
        <CardContent>
  {devices.length === 0 ? (
    <div className="text-center py-8 text-muted-foreground">
      <p>No devices found.</p>
      <p className="text-sm mt-2">Click "Add Device" to get started.</p>
    </div>
  ) : (
    <>
      <div className="space-y-4">
      {devices
  .filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (device.description?.toLowerCase().includes(searchQuery.toLowerCase()))
  )
  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  .map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{device.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {device.description || "No description"}
                </p>
                {device.deviceDistinctions.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs text-blue-600">
                      Distinctions: {device.deviceDistinctions.map(dd => dd.deviceDistinction.name).join(", ")}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEditDialog(device)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteDevice(device.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </div>

     {/* Pagination Controls */}
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


    </>
  )}
</CardContent>

      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Device</DialogTitle>
          </DialogHeader>
          {editingDevice && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-device-name">Device Name</Label>
                <Input
                  id="edit-device-name"
                  value={editingDevice.name}
                  onChange={(e) => setEditingDevice({ ...editingDevice, name: e.target.value })}
                  placeholder="Enter device name"
                />
              </div>
              <div>
                <Label htmlFor="edit-device-description">Description</Label>
                <Textarea
                  id="edit-device-description"
                  value={editingDevice.description || ""}
                  onChange={(e) => setEditingDevice({ ...editingDevice, description: e.target.value })}
                  placeholder="Enter device description"
                  rows={3}
                />
              </div>
              

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditDevice} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 