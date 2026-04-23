"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function SubmitPage() {
  const router = useRouter();
  const { addSubmission } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    url: "",
    summary: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 自动生成 slug
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "logo" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "logo") {
          setLogoPreview(result);
        } else {
          setCoverPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (type: "logo" | "cover") => {
    if (type === "logo") {
      setLogoPreview("");
    } else {
      setCoverPreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.url || !formData.summary) {
      toast.error("请填写必填字段");
      return;
    }

    setIsSubmitting(true);

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    addSubmission({
      name: formData.name,
      slug: formData.slug,
      url: formData.url,
      logo: logoPreview,
      coverImage: coverPreview,
      summary: formData.summary,
      description: formData.description,
    });

    toast.success("提交成功，请等待审核");
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">提交站点</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">填写站点信息</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel>
                  网站名称 <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="name"
                  placeholder="输入网站名称"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input
                  name="slug"
                  placeholder="url-friendly-name"
                  value={formData.slug}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  用于生成工具详情页 URL，将自动根据名称生成
                </p>
              </Field>

              <Field>
                <FieldLabel>
                  网址 <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="url"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Logo 图片</FieldLabel>
                <div className="flex items-center gap-4">
                  {logoPreview ? (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-20 h-20 rounded-xl object-cover bg-muted"
                        suppressHydrationWarning
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("logo")}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground mt-1">
                        上传
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "logo")}
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议尺寸 200x200，仅支持本地预览
                  </p>
                </div>
              </Field>

              <Field>
                <FieldLabel>预览图</FieldLabel>
                <div className="flex flex-col gap-3">
                  {coverPreview ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-40 rounded-xl object-cover bg-muted"
                        suppressHydrationWarning
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("cover")}
                        className="absolute top-2 right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full max-w-md h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground mt-2">
                        点击上传预览图
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, "cover")}
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议尺寸 1200x630，仅支持本地预览
                  </p>
                </div>
              </Field>

              <Field>
                <FieldLabel>
                  工具概要 <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="summary"
                  placeholder="用一句话描述这个工具"
                  value={formData.summary}
                  onChange={handleInputChange}
                  maxLength={100}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.summary.length}/100
                </p>
              </Field>

              <Field>
                <FieldLabel>详细介绍</FieldLabel>
                <Textarea
                  name="description"
                  placeholder="详细介绍这个工具的功能和特点..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                />
              </Field>
            </FieldGroup>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "提交中..." : "提交审核"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
