'use client'

import { useEffect, useState } from 'react'

type Category = {
  id: string
  categoryName: string
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null)
  const [editCategoryName, setEditCategoryName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false) // state khusus saat tambah

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Token tidak ditemukan, silakan login terlebih dahulu.')
      return null
    }
    setError(null)
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const headers = getAuthHeaders()
      if (!headers) {
        setLoading(false)
        return
      }

      const res = await fetch('/api/category', { headers })
      if (!res.ok) throw new Error('Gagal mengambil kategori')
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error('Failed to fetch categories', err)
      setError('Gagal mengambil data kategori.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Reset error jika user ketik ulang input baru
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value)
    if (error) setError(null)
  }

  const handleAdd = async () => {
    if (!newCategoryName.trim()) {
      setError('Nama kategori tidak boleh kosong.')
      return
    }

    setAdding(true)
    try {
      const headers = getAuthHeaders()
      if (!headers) {
        setAdding(false)
        return
      }

      const res = await fetch('/api/category', {
        method: 'POST',
        headers,
        body: JSON.stringify({ categoryName: newCategoryName }),
      })
      if (!res.ok) throw new Error('Gagal menambah kategori')
      setNewCategoryName('')
      await fetchCategories()
    } catch (err) {
      console.error('Add failed:', err)
      setError('Gagal menambah kategori.')
    } finally {
      setAdding(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditCategoryId(category.id)
    setEditCategoryName(category.categoryName)
    setError(null)
  }

  const handleUpdate = async () => {
    if (!editCategoryId || !editCategoryName.trim()) {
      setError('Nama kategori tidak boleh kosong.')
      return
    }

    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const res = await fetch(`/api/category/${editCategoryId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ categoryName: editCategoryName }),
      })
      if (!res.ok) throw new Error('Gagal mengupdate kategori')
      setEditCategoryId(null)
      setEditCategoryName('')
      await fetchCategories()
    } catch (err) {
      console.error('Update failed:', err)
      setError('Gagal mengupdate kategori.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const headers = getAuthHeaders()
      if (!headers) return

      const res = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
        headers,
      })
      if (!res.ok) throw new Error('Gagal menghapus kategori')
      await fetchCategories()
    } catch (err) {
      console.error('Delete failed:', err)
      setError('Gagal menghapus kategori.')
    }
  }

  return (
    <div className="w-full px-6 py-8 bg-white rounded-xl shadow ring-1 ring-gray-200">
      <h1 className="text-2xl font-bold mb-6">📂 Kategori Berita</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Form Tambah */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Nama kategori baru..."
          value={newCategoryName}
          onChange={handleNewCategoryChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md"
          disabled={loading || adding}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || adding}
        >
          {adding ? 'Menambah...' : 'Tambah'}
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 italic">Tidak ada kategori ditemukan.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 border w-12">No</th>
                <th className="px-4 py-2 border">Nama Kategori</th>
                <th className="px-4 py-2 border w-40">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">
                    {editCategoryId === cat.id ? (
                      <input
                        type="text"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      cat.categoryName
                    )}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    {editCategoryId === cat.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditCategoryId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-xs"
                        >
                          Batal
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(cat)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                          disabled={!!error}
                        >
                          Edit
                        </button>
                        {/* <button
                          onClick={() => handleDelete(cat.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                          disabled={!!error}
                        >
                          Hapus
                        </button> */}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
