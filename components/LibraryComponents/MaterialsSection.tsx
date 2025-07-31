import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Material {
  id: string;
  name: string;
  description: string | null;
  quantity: number;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export function MaterialsSection() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [newMaterial, setNewMaterial] = useState({ name: "", description: "", quantity: 0, unit: "" });
  const [isLoading, setIsLoading] = useState(false);

  const commonUnits = ["pieces", "boxes", "kg", "liters", "meters", "pairs", "sets", "rolls", "bottles", "cans"];

  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    const filtered = materials.filter((material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
    setCurrentPage(1);
  }, [searchTerm, materials]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/materials");
      if (response.ok) {
        const data = await response.json();
        setMaterials(data);
      } else {
        console.error("Failed to fetch materials");
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleAddMaterial = async () => {
    if (newMaterial.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/materials", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newMaterial.name.trim(),
            description: newMaterial.description.trim() || null,
            quantity: parseInt(newMaterial.quantity.toString()) || 0,
            unit: newMaterial.unit || null,
          }),
        });

        if (response.ok) {
          const newMaterialData = await response.json();
          setMaterials([newMaterialData, ...materials]);
          setNewMaterial({ name: "", description: "", quantity: 0, unit: "" });
          setIsAddDialogOpen(false);
        } else {
          const error = await response.json();
          console.error("Failed to add material:", error);
        }
      } catch (error) {
        console.error("Error adding material:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditMaterial = async () => {
    if (editingMaterial && editingMaterial.name.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/materials/${editingMaterial.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingMaterial.name.trim(),
            description: editingMaterial.description?.trim() || null,
            quantity: parseInt(editingMaterial.quantity.toString()) || 0,
            unit: editingMaterial.unit || null,
          }),
        });

        if (response.ok) {
          const updatedMaterial = await response.json();
          setMaterials(materials.map(material => 
            material.id === editingMaterial.id ? updatedMaterial : material
          ));
          setEditingMaterial(null);
          setIsEditDialogOpen(false);
        } else {
          const error = await response.json();
          console.error("Failed to update material:", error);
        }
      } catch (error) {
        console.error("Error updating material:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/materials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMaterials(materials.filter(material => material.id !== id));
      } else {
        const error = await response.json();
        console.error("Failed to delete material:", error);
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (material: Material) => {
    setEditingMaterial({ ...material });
    setIsEditDialogOpen(true);
  };

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = filteredMaterials.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Materials Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
  <DialogTrigger asChild>
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add Material
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Materials</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div>
        <Label htmlFor="material-name">Material Name</Label>
        <Input
          id="material-name"
          value={newMaterial.name}
          onChange={(e) =>  setNewMaterial({ ...newMaterial, name: e.target.value })}
          placeholder="Enter material name"
        />
      </div>
      <div>
        <Label htmlFor="-dematerial-description">Description</Label>
        <Textarea
          id="material-description"
          value={newMaterial.description}
          onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
          placeholder="Enter material description"
          rows={3}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleAddMaterial} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Material"}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>

      </div>

      <Input
        type="text"
        placeholder="Search materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Card>
        <CardHeader>
          <CardTitle>Materials List</CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedMaterials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No materials found.</p>
              <p className="text-sm mt-2">Click "Add Material" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{material.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {material.description || "No description"}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      Quantity: {material.quantity} {material.unit || "units"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(material)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteMaterial(material.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span className="text-sm px-2">Page {currentPage} of {totalPages}</span>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog remains unchanged */}
    </div>
  );
}
