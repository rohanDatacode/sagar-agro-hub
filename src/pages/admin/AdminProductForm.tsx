import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useProducts } from '@/context/ProductContext';
import { categoryLabels, Product } from '@/lib/data';
import { toast } from 'sonner';

type ProductFormData = Omit<Product, 'id'>;

const initialFormData: ProductFormData = {
  name: '',
  category: 'water-soluble',
  description: '',
  usage: '',
  benefits: [''],
  price: 0,
};

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addProduct, updateProduct, getProduct } = useProducts();
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!id;
  const pageTitle = isEditing ? 'Edit Product' : 'Add New Product';

  useEffect(() => {
    if (isEditing) {
      const product = getProduct(id);
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          usage: product.usage,
          benefits: product.benefits.length > 0 ? product.benefits : [''],
          price: product.price,
        });
      } else {
        toast.error('Product not found');
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, getProduct, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: Product['category']) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleBenefitChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((b, i) => (i === index ? value : b)),
    }));
  };

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ''],
    }));
  };

  const removeBenefit = (index: number) => {
    if (formData.benefits.length > 1) {
      setFormData((prev) => ({
        ...prev,
        benefits: prev.benefits.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Filter out empty benefits
    const cleanedBenefits = formData.benefits.filter((b) => b.trim() !== '');

    const productData: ProductFormData = {
      ...formData,
      benefits: cleanedBenefits.length > 0 ? cleanedBenefits : ['No benefits specified'],
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (isEditing) {
      updateProduct(id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }

    setIsSubmitting(false);
    navigate('/admin/products');
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing
              ? 'Update the product information below'
              : 'Fill in the details to add a new product'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., AgroGrow NPK 19-19-19"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a detailed description of the product..."
                rows={4}
                required
              />
            </div>

            {/* Usage */}
            <div className="space-y-2">
              <Label htmlFor="usage">Usage Instructions *</Label>
              <Textarea
                id="usage"
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                placeholder="How should this product be used?"
                rows={3}
                required
              />
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <Label>Benefits *</Label>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      placeholder={`Benefit ${index + 1}`}
                    />
                    {formData.benefits.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBenefit(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBenefit}
                  className="gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Benefit
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 450"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {isEditing ? 'Update Product' : 'Add Product'}
                </>
              )}
            </Button>
            <Link to="/admin/products">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
