import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

import { firstValueFrom } from 'rxjs';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UsuarioService } from './usuario.service';

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getFirestore: vi.fn(() => ({})),
  onSnapshot: vi.fn(),
  updateDoc: vi.fn(),
}));

describe('UsuarioService', () => {
  let service: UsuarioService;

  const referenciaColeccion = {
    tipo: 'coleccion',
  };

  const referenciaDocumento = {
    tipo: 'documento',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(collection).mockReturnValue(referenciaColeccion as never);

    vi.mocked(doc).mockReturnValue(referenciaDocumento as never);

    service = new UsuarioService();
  });

  it('debe crear un usuario en Firestore', async () => {
    const datos = {
      nombre: 'Kevin',
      email: 'kevin@email.com',
      telefono: '2920123456',
    };

    vi.mocked(addDoc).mockResolvedValue({
      id: 'usuario-1',
    } as never);

    const resultado = await firstValueFrom(service.crearUsuario(datos));

    expect(addDoc).toHaveBeenCalledWith(referenciaColeccion, {
      name: 'Kevin',
      email: 'kevin@email.com',
      phone: '2920123456',
    });

    expect(resultado).toEqual({
      id: 'usuario-1',
      name: 'Kevin',
      email: 'kevin@email.com',
      phone: '2920123456',
    });
  });

  it('debe actualizar un usuario en Firestore', async () => {
    const datos = {
      nombre: 'Kevin actualizado',
      email: 'actualizado@email.com',
      telefono: '2920654321',
    };

    vi.mocked(updateDoc).mockResolvedValue(undefined);

    const resultado = await firstValueFrom(service.actualizarUsuario('usuario-3', datos));

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'usuarios', 'usuario-3');

    expect(updateDoc).toHaveBeenCalledWith(referenciaDocumento, {
      name: 'Kevin actualizado',
      email: 'actualizado@email.com',
      phone: '2920654321',
    });

    expect(resultado).toEqual({
      id: 'usuario-3',
      name: 'Kevin actualizado',
      email: 'actualizado@email.com',
      phone: '2920654321',
    });
  });

  it('debe eliminar un usuario de Firestore', async () => {
    vi.mocked(deleteDoc).mockResolvedValue(undefined);

    await firstValueFrom(service.eliminarUsuario('usuario-4'));

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'usuarios', 'usuario-4');

    expect(deleteDoc).toHaveBeenCalledWith(referenciaDocumento);
  });

  it('debe obtener un usuario de Firestore', async () => {
    vi.mocked(getDoc).mockResolvedValue({
      exists: () => true,

      data: () => ({
        name: 'Kevin',
        email: 'kevin@email.com',
        phone: '2920123456',
      }),

      id: 'usuario-5',
    } as never);

    const resultado = await firstValueFrom(service.getUsuario('usuario-5'));

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'usuarios', 'usuario-5');

    expect(resultado).toEqual({
      id: 'usuario-5',
      name: 'Kevin',
      email: 'kevin@email.com',
      phone: '2920123456',
    });
  });
});
