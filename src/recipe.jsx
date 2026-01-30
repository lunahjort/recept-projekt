function Recipe({ title, category }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>Kategori: {category}</p>
        </div>
    );
}

export default Recipe