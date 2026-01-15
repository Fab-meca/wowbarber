import { useState } from 'react';
import { Scissors, Edit2, Save, X, Plus, Trash2, Star, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useServices, Service } from '@/hooks/useServices';

const ServicesEditor = () => {
  const { services, updateService, addService, deleteService, resetToDefault } = useServices();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Service>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: '',
    duration: '',
    featured: false,
  });

  const startEditing = (service: Service) => {
    setEditingId(service.id);
    setEditForm({ ...service });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEditing = () => {
    if (editingId && editForm) {
      updateService(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleAddService = () => {
    if (newService.name && newService.price) {
      addService(newService);
      setNewService({
        name: '',
        description: '',
        price: '',
        duration: '',
        featured: false,
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-display text-2xl text-foreground flex items-center gap-2">
          <Scissors className="w-6 h-6 text-gold" />
          Serviços e Preços
        </h2>
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={resetToDefault}
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Serviço
          </Button>
        </div>
      </div>

      {/* Services list */}
      <div className="space-y-4">
        {/* Add new service form */}
        {isAdding && (
          <div className="bg-secondary/50 border border-gold/30 rounded-lg p-4">
            <h4 className="font-medium text-gold mb-4">Novo Serviço</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input
                placeholder="Nome"
                value={newService.name}
                onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                className="bg-card border-border"
              />
              <Input
                placeholder="Preço (ex: R$ 45)"
                value={newService.price}
                onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                className="bg-card border-border"
              />
              <Input
                placeholder="Duração (ex: 45 min)"
                value={newService.duration}
                onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                className="bg-card border-border"
              />
              <Input
                placeholder="Descrição"
                value={newService.description}
                onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                className="bg-card border-border"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={newService.featured}
                  onChange={(e) => setNewService(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-border"
                />
                <Star className="w-4 h-4" />
                Destacar como popular
              </label>
              <div className="flex-1" />
              <Button variant="secondary" size="sm" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button variant="gold" size="sm" onClick={handleAddService}>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        )}

        {/* Existing services */}
        {services.map(service => (
          <div
            key={service.id}
            className={`border rounded-lg p-4 transition-colors ${
              editingId === service.id ? 'border-gold bg-secondary/50' : 'border-border'
            }`}
          >
            {editingId === service.id ? (
              // Edit mode
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-card border-border"
                    placeholder="Nome"
                  />
                  <Input
                    value={editForm.price || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                    className="bg-card border-border"
                    placeholder="Preço"
                  />
                  <Input
                    value={editForm.duration || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="bg-card border-border"
                    placeholder="Duração"
                  />
                  <Input
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="bg-card border-border"
                    placeholder="Descrição"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.featured || false}
                      onChange={(e) => setEditForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-border"
                    />
                    <Star className="w-4 h-4" />
                    Destacar
                  </label>
                  <div className="flex-1" />
                  <Button variant="secondary" size="sm" onClick={cancelEditing}>
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button variant="gold" size="sm" onClick={saveEditing}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            ) : (
              // View mode
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{service.name}</h4>
                    {service.featured && (
                      <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-gold">{service.price}</p>
                  <p className="text-xs text-muted-foreground">{service.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEditing(service)}
                    className="text-muted-foreground hover:text-gold"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteService(service.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        💡 As alterações são salvas automaticamente no navegador e refletidas na página principal.
      </p>
    </div>
  );
};

export default ServicesEditor;
