import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '../types';
import { Package, MapPin, Heart, Settings, LogOut } from 'lucide-react';

export const Dashboard = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        snapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center font-bold text-xl border border-emerald-500/30">
                {profile?.displayName?.[0] || user.email?.[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-white font-bold line-clamp-1">{profile?.displayName || 'User'}</h3>
                <p className="text-xs text-zinc-400 line-clamp-1">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">Orders</span>
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'addresses' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium">Addresses</span>
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'wishlist' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <button 
                onClick={() => logout()}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 min-h-[60vh]">
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                {loading ? (
                  <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div></div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-zinc-400">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-zinc-800 rounded-xl p-6 bg-zinc-950">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-zinc-800">
                          <div>
                            <p className="text-sm text-zinc-400">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs text-zinc-500">{new Date(order.createdAt?.toDate?.() || order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                            <span className="text-white font-bold">${order.total.toFixed(2)}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                              order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                              order.status === 'cancelled' ? 'bg-rose-500/20 text-rose-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                              <img src={item.images[0]} alt={item.name} className="w-12 h-12 rounded-md object-contain bg-zinc-800 p-1" referrerPolicy="no-referrer" />
                              <div className="flex-grow">
                                <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                                <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Saved Addresses</h2>
                <div className="text-center py-12 text-zinc-400">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No saved addresses yet.</p>
                  <button className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium">Add New Address</button>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
                <div className="text-center py-12 text-zinc-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your wishlist is empty.</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Display Name</label>
                    <input type="text" defaultValue={profile?.displayName || ''} className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email || ''} disabled className="w-full bg-zinc-950 border border-zinc-800 text-zinc-500 px-4 py-3 rounded-xl opacity-70 cursor-not-allowed" />
                  </div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
