import React, { useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Card, Dialog, Field, PageHeader, btnDanger, btnPrimary, btnSecondary, inputClass } from './ui';

export type FieldType = 'text' | 'textarea' | 'list' | 'select' | 'number' | 'checkbox';

export interface FieldDef<T> {
  key: keyof T & string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  hint?: string;
  fullWidth?: boolean;
}

interface CrudPanelProps<T extends { id: string }> {
  title: string;
  description: string;
  itemLabel: string;
  items: T[];
  fields: FieldDef<T>[];
  emptyItem: Omit<T, 'id'>;
  searchText: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onAdd: (item: Omit<T, 'id'>) => void;
  onUpdate: (id: string, item: Partial<T>) => void;
  onDelete: (id: string) => void;
}

type FormValues = Record<string, string | number | boolean>;

// Ubah item menjadi nilai form (list -> teks per baris) dan sebaliknya.
const toForm = <T,>(item: Omit<T, 'id'>, fields: FieldDef<T>[]): FormValues => {
  const values: FormValues = {};
  for (const f of fields) {
    const raw = (item as Record<string, unknown>)[f.key];
    if (f.type === 'list') values[f.key] = Array.isArray(raw) ? raw.join('\n') : '';
    else if (f.type === 'checkbox') values[f.key] = Boolean(raw);
    else if (f.type === 'number') values[f.key] = typeof raw === 'number' ? raw : 0;
    else values[f.key] = raw == null ? '' : String(raw);
  }
  return values;
};

const fromForm = <T,>(values: FormValues, fields: FieldDef<T>[]): Partial<T> => {
  const result: Record<string, unknown> = {};
  for (const f of fields) {
    const v = values[f.key];
    if (f.type === 'list') {
      result[f.key] = String(v).split('\n').map(s => s.trim()).filter(Boolean);
    } else if (f.type === 'number') {
      result[f.key] = Number(v) || 0;
    } else {
      result[f.key] = v;
    }
  }
  return result as Partial<T>;
};

export function CrudPanel<T extends { id: string }>({
  title,
  description,
  itemLabel,
  items,
  fields,
  emptyItem,
  searchText,
  renderItem,
  onAdd,
  onUpdate,
  onDelete,
}: CrudPanelProps<T>) {
  const [query, setQuery] = useState('');
  // null = dialog tertutup, 'new' = tambah, selain itu id item yang diedit
  const [editing, setEditing] = useState<string | null>(null);
  const [values, setValues] = useState<FormValues>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter(item => searchText(item).toLowerCase().includes(q)) : items;
  }, [items, query, searchText]);

  const openNew = () => {
    setValues(toForm(emptyItem, fields));
    setEditing('new');
  };

  const openEdit = (item: T) => {
    setValues(toForm(item, fields));
    setEditing(item.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = fromForm(values, fields);
    if (editing === 'new') onAdd({ ...emptyItem, ...payload } as Omit<T, 'id'>);
    else if (editing) onUpdate(editing, payload);
    setEditing(null);
  };

  const handleDelete = (item: T) => {
    if (window.confirm(`Hapus ${itemLabel} ini? Tindakan ini tidak bisa dibatalkan.`)) onDelete(item.id);
  };

  const setValue = (key: string, value: string | number | boolean) => setValues(prev => ({ ...prev, [key]: value }));

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          <button onClick={openNew} className={btnPrimary}>
            <Plus className="w-4 h-4" />
            Tambah {itemLabel}
          </button>
        }
      />

      <div className="relative mb-4 max-w-sm">
        <input
          type="search"
          placeholder={`Cari ${itemLabel}...`}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={`${inputClass} pl-9 bg-white`}
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <Card className="divide-y divide-slate-100">
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">Belum ada {itemLabel} yang cocok.</p>
        )}
        {filtered.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(item)} className={`${btnSecondary} !py-2 !px-3 text-xs`}>
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
              <button onClick={() => handleDelete(item)} className={btnDanger}>
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </Card>

      {editing && (
        <Dialog title={editing === 'new' ? `Tambah ${itemLabel}` : `Edit ${itemLabel}`} onClose={() => setEditing(null)}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(f => {
              const full = f.fullWidth || f.type === 'textarea' || f.type === 'list';
              const value = values[f.key];
              let control: React.ReactNode;

              if (f.type === 'checkbox') {
                return (
                  <label key={f.key} className="flex items-center gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={e => setValue(f.key, e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    {f.label}
                  </label>
                );
              }

              if (f.type === 'textarea' || f.type === 'list') {
                control = (
                  <textarea
                    rows={f.type === 'list' ? 4 : 3}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={String(value)}
                    onChange={e => setValue(f.key, e.target.value)}
                    className={inputClass}
                  />
                );
              } else if (f.type === 'select') {
                control = (
                  <select value={String(value)} onChange={e => setValue(f.key, e.target.value)} className={inputClass}>
                    {f.options?.map(o => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                );
              } else {
                control = (
                  <input
                    type={f.type === 'number' ? 'number' : 'text'}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={String(value)}
                    onChange={e => setValue(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className={inputClass}
                  />
                );
              }

              return (
                <Field
                  key={f.key}
                  label={f.label}
                  hint={f.type === 'list' ? f.hint ?? 'Satu item per baris.' : f.hint}
                  className={full ? 'sm:col-span-2' : ''}
                >
                  {control}
                </Field>
              );
            })}

            <div className="sm:col-span-2 flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button type="button" onClick={() => setEditing(null)} className={btnSecondary}>
                Batal
              </button>
              <button type="submit" className={btnPrimary}>
                Simpan
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
}
