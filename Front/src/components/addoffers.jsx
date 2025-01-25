import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

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
          <div className="bg-[#101828] p-8 w-[80%] sm:w-[50%] md:w-[40%] rounded-lg">
            <h2 className="text-2xl text-white text-center mb-4">{isEditing ? 'Editar Oferta' : 'Crear Oferta'}</h2>
            <form onSubmit={handleSubmit}>
              <label>Nombre de la oferta</label>
              <input type="text" name="nombre" value={offerData.nombre} onChange={handleInputChange} required />

              <label>Tipo de oferta</label>
              <input type="text" name="tipo" value={offerData.tipo} onChange={handleInputChange} required />

              <label>Descuento</label>
              <input type="number" name="valor" value={offerData.valor} onChange={handleInputChange} required />

              <label>Fecha de inicio</label>
              <input type="date" name="fecha_inicio" value={offerData.fecha_inicio} onChange={handleInputChange} required />

              <label>Fecha de fin</label>
              <input type="date" name="fecha_fin" value={offerData.fecha_fin} onChange={handleInputChange} required />

              <label>Códigos de artículos (separados por comas)</label>
              <input 
                type="text" 
                placeholder="Ej: 123,456,789" 
                value={offerData.articulos}
                onChange={handleArticleSelection} 
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
      <h2 className="offers-title">Ofertas Disponibles</h2>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id_oferta} className="offer-card">
            <h3 className="offer-name">{offer.nombre}</h3>
            <p><strong>Tipo:</strong> {offer.tipo}</p>
            <p><strong>Descuento:</strong> {offer.valor}%</p>
            <p><strong>Fechas:</strong> {offer.fecha_inicio} - {offer.fecha_fin}</p>
            <p><strong>Artículos:</strong> {offer.articulos.map(a => (
              <div key={a.codigo_articulo} className="articulo-item">
                <p>{a.descripcion || a.codigo_articulo}</p>
                {/* Mostrar la imagen del artículo */}
                {a.url_img && <img src={a.url_img} alt={a.descripcion || 'Artículo'} className="article-image" />}
              </div>
            ))}</p>
            <div className="offer-buttons">
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

      <ToastContainer />
    </div>
  );
};

export default AddOffer;
