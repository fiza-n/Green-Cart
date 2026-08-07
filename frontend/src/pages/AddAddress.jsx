import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { assets } from '../../public/assets'
import { useAppContext } from '../context/AppContext'

const initialForm = {
  fullName: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  label: 'Home',
  instructions: '',
}

const AddAddress = () => {
  const navigate = useNavigate()
  const { addAddress } = useAppContext()
  const [formData, setFormData] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const savedAddress = addAddress({
      ...formData,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    })
    toast.success('Address saved successfully')
    navigate('/cart')
    console.log('Saved address:', savedAddress)
  }

  return (
    <div className="min-h-[75vh] py-8 md:py-12">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:p-10">
        <div>
          <div className="inline-flex items-center rounded-full bg-lime-100 px-3 py-1 text-sm font-medium text-lime-700">
            Delivery details
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-zinc-900 sm:text-4xl">
            Add shipping address
          </h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-600 sm:text-base">
            Enter your delivery details so your groceries reach you quickly and safely.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="Aman Sharma"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Phone number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">Street address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                placeholder="House no, building, street"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="Mumbai"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="Maharashtra"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">PIN code</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="400001"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Address label</label>
                <select
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Delivery instructions</label>
                <input
                  type="text"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-primary focus:bg-white"
                  placeholder="Ring the bell"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dull"
              >
                Save address
              </button>
              <button
                type="button"
                onClick={() => navigate('/cart')}
                className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-[28px] bg-lime-50 p-6 sm:p-8">
          <img src={assets.add_address_iamge} alt="Delivery illustration" className="mx-auto w-full max-w-sm" />
          <div className="mt-6 rounded-2xl border border-lime-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">Why this helps</p>
            <ul className="mt-2 space-y-2 text-sm text-zinc-600">
              <li>• Faster doorstep delivery</li>
              <li>• Better order tracking</li>
              <li>• Easy repeat orders for your favorites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAddress