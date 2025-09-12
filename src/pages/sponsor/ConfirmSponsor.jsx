const ConfirmSponsor = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow p-8 mx-auto max-w-lg mt-12">
            <div className="text-green-500 text-6xl mb-4">✔️</div>
            <h1 className="text-2xl font-bold mb-2 text-center">¡Gracias por registrarte como SPONSOR!</h1>
            <p className="text-gray-700 text-center mb-4">
                Tu solicitud fue enviada correctamente.<br />
                Estaremos analizando tu registro y te avisaremos por correo electrónico cuando tengamos una respuesta.<br />
                Una vez aprobado, podrás acceder a la plataforma y gestionar tus workers.
            </p>
            <div className="text-gray-500 text-sm text-center">
                Si tienes dudas, revisa tu correo o contacta a soporte.
            </div>
        </div>
    );
};

export default ConfirmSponsor;