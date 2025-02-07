import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import Footer from './Footer';

const API = 'http://localhost:5000';

const AddOffer = () => {
  const [offerData, setOfferData] = useState({
    nombre: '',
    tipo: '',
    valor: '',
    fecha_inicio: '',
    fecha_fin: '',
    articulos: []
  });
  const [articles, setArticles] = useState([]);
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false); // Controlar la visibilidad del formulario
  const [isEditing, setIsEditing] = useState(false); // Indica si estamos editando
  const [editingOfferId, setEditingOfferId] = useState(null); // ID de la oferta que se está editando

  useEffect(() => {
    fetch(`${API}/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(error => console.error(error));

    fetch(`${API}/get_offers`)
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleArticleSelection = (e) => {
    const articleCode = e.target.value.trim();
    setOfferData(prevState => ({
      ...prevState,
      articulos: articleCode.split(',').map(code => code.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData)
    };

    const endpoint = isEditing ? `${API}/update_offer/${editingOfferId}` : `${API}/add_offer`;

    fetch(endpoint, requestOptions)
      .then(response => {
        if (response.ok) {
          toast.success(isEditing ? 'Oferta actualizada exitosamente' : 'Oferta creada exitosamente');
          setOfferData({ nombre: '', tipo: '', valor: '', fecha_inicio: '', fecha_fin: '', articulos: [] });
          setShowForm(false);
          setIsEditing(false);
          setEditingOfferId(null);
          return fetch(`${API}/get_offers`);
        } else {
          throw new Error(isEditing ? 'Error al actualizar la oferta' : 'Error al crear la oferta');
        }
      })
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(error => toast.error(error.message));
  };

  const handleEdit = (offer) => {
    setIsEditing(true);
    setEditingOfferId(offer.id_oferta);
    setOfferData({
      nombre: offer.nombre,
      tipo: offer.tipo,
      valor: offer.valor,
      fecha_inicio: offer.fecha_inicio,
      fecha_fin: offer.fecha_fin,
      articulos: offer.articulos.map(a => a.codigo_articulo).join(',')
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      fetch(`${API}/delete_offer/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            toast.success('Oferta eliminada exitosamente');
            return fetch(`${API}/get_offers`);
          } else {
            throw new Error('Error al eliminar la oferta');
          }
        })
        .then(res => res.json())
        .then(data => setOffers(data))
        .catch(error => toast.error(error.message));
    }
  };

  const handleCancel = () => {
    setOfferData({ nombre: '', tipo: '', valor: '', fecha_inicio: '', fecha_fin: '', articulos: [] });
    setShowForm(false);
    setIsEditing(false);
    setEditingOfferId(null);
  };

  return (
    <div>
    <div className="offers-container">
      {/* Botón para mostrar/ocultar el formulario */}
      <button 
        className="offer-edit-button"
        onClick={() => { setShowForm(!showForm); setIsEditing(false); }}
        style={{ marginBottom: '20px' }}
      >
        {isEditing ? 'Cancelar edición' : 'Crear nueva oferta'}
      </button>

      {/* Formulario para crear/editar ofertas */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#101828] p-8 w-[80%] sm:w-[50%] md:w-[40%] rounded-lg shadow-lg transition-all duration-300">
            <h2 className="text-3xl text-white text-center mb-4 font-semibold">{isEditing ? 'Editar Oferta' : 'Crear Oferta'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-white">Nombre de la oferta</label>
              <input 
                type="text" 
                name="nombre" 
                value={offerData.nombre} 
                onChange={handleInputChange} 
                className="input-field"
                required 
              />

              <label className="block text-white">Tipo de oferta</label>
              <input 
                type="text" 
                name="tipo" 
                value={offerData.tipo} 
                onChange={handleInputChange} 
                className="input-field"
                required 
              />

              <label className="block text-white">Descuento</label>
              <input 
                type="number" 
                name="valor" 
                value={offerData.valor} 
                onChange={handleInputChange} 
                className="input-field"
                required 
              />

              <label className="block text-white">Fecha de inicio</label>
              <input 
                type="date" 
                name="fecha_inicio" 
                value={offerData.fecha_inicio} 
                onChange={handleInputChange} 
                className="input-field"
                required 
              />

              <label className="block text-white">Fecha de fin</label>
              <input 
                type="date" 
                name="fecha_fin" 
                value={offerData.fecha_fin} 
                onChange={handleInputChange} 
                className="input-field"
                required 
              />

              <label className="block text-white">Códigos de artículos (separados por comas)</label>
              <input 
                type="text" 
                placeholder="Ej: 123,456,789" 
                value={offerData.articulos}
                onChange={handleArticleSelection} 
                className="input-field"
                required 
              />

                <div className="form-buttons">
                <button type="submit" className="offer-edit-button">{isEditing ? 'Actualizar oferta' : 'Crear oferta'}</button>
                <button type="button" onClick={handleCancel} className="offer-delete-button">Cancelar</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Sección de ofertas disponibles en columnas */}
      <h2 className="offers-title text-3xl font-semibold text-center mt-8 mb-4 text-white">Ofertas Disponibles</h2>
      <div className="offers-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <div key={offer.id_oferta} className="offer-card bg-[#1A202C] p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <h3 className="offer-name text-xl font-bold text-white">{offer.nombre}</h3>
            <p className="text-gray-300"><strong>Tipo:</strong> {offer.tipo}</p>
            <p className="text-gray-300"><strong>Descuento:</strong> {offer.valor}%</p>
            <p className="text-gray-300"><strong>Fechas:</strong> {offer.fecha_inicio} - {offer.fecha_fin}</p>
            <p className="text-gray-300"><strong>Artículos:</strong> {offer.articulos.map(a => (
              <div key={a.codigo_articulo} className="articulo-item">
                <p>{a.descripcion || a.codigo_articulo}</p>
                {a.url_img && <img src={a.url_img} alt={a.descripcion || 'Artículo'} className="article-image w-16 h-16 object-cover rounded-full" />}
              </div>
            ))}</p>
            <div className="offer-buttons flex justify-between mt-4">
              <button 
                className="offer-edit-button" 
                onClick={() => handleEdit(offer)}
              >
                Editar
              </button>
              <button 
                className="offer-delete-button" 
                onClick={() => handleDelete(offer.id_oferta)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
     
    </div>
    <Footer />
    </div>
  );
};

export default AddOffer;
