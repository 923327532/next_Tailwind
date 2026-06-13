import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const LaboratorioApp());
}

class LaboratorioApp extends StatelessWidget {
  const LaboratorioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Laboratorio Componentes III',
      theme: AppTheme.lightTheme,
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginPage(),
        '/registro': (context) => const RegisterPage(),
        '/menu': (context) => const MenuPrincipalPage(),
        '/ejercicio1': (context) => const EjercicioListaPage(),
        '/ejercicio2': (context) => const DetalleProductoPage(),
        '/ejercicio3': (context) => const GaleriaImagenesPage(),
        '/registrarProducto': (context) => const ProductRegisterPage(),
        '/listarProductos': (context) => const ProductoListaPage(),
      },
    );
  }
}

class AppTheme {
  static ThemeData get lightTheme {
    const seedColor = Color(0xFF1565C0);
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(seedColor: seedColor),
      scaffoldBackgroundColor: const Color(0xFFF5F7FB),
      appBarTheme: AppBarTheme(
        centerTitle: true,
        elevation: 0,
        backgroundColor: seedColor,
        foregroundColor: Colors.white,
        titleTextStyle: GoogleFonts.montserrat(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.w700,
        ),
      ),
      cardTheme: CardThemeData(
        elevation: 4,
        shadowColor: Colors.black12,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(18),
        ),
        margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 4),
      ),
      listTileTheme: const ListTileThemeData(
        contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: seedColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
        ),
      ),
    );
  }
}

// ============================================================
// LOGIN
// ============================================================
class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Inicio de Sesión')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.lock_outline,
                  size: 80,
                  color: Theme.of(context).colorScheme.primary,
                ),
                const SizedBox(height: 16),
                Text(
                  'Bienvenido',
                  style: GoogleFonts.montserrat(
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Inicia sesión para acceder al menú',
                  style: GoogleFonts.roboto(fontSize: 14, color: Colors.grey),
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'Correo electrónico',
                    prefixIcon: const Icon(Icons.email_outlined),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Ingrese su correo';
                    }
                    if (!value.contains('@')) {
                      return 'Correo inválido';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    labelText: 'Contraseña',
                    prefixIcon: const Icon(Icons.lock_outlined),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Ingrese su contraseña';
                    }
                    if (value.length < 4) {
                      return 'Mínimo 4 caracteres';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        Navigator.pushReplacementNamed(context, '/menu');
                      }
                    },
                    icon: const Icon(Icons.login),
                    label: const Text('Iniciar Sesión'),
                  ),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/registro');
                  },
                  child: const Text('¿No tienes cuenta? Regístrate'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================
// REGISTRO
// ============================================================
class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Registro de Usuario')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.person_add,
                  size: 80,
                  color: Theme.of(context).colorScheme.primary,
                ),
                const SizedBox(height: 16),
                Text(
                  'Crear Cuenta',
                  style: GoogleFonts.montserrat(
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 32),
                TextFormField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    labelText: 'Nombre completo',
                    prefixIcon: const Icon(Icons.person_outlined),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Ingrese su nombre';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: 'Correo electrónico',
                    prefixIcon: const Icon(Icons.email_outlined),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Ingrese su correo';
                    }
                    if (!value.contains('@')) {
                      return 'Correo inválido';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    labelText: 'Contraseña',
                    prefixIcon: const Icon(Icons.lock_outlined),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                    ),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Ingrese su contraseña';
                    }
                    if (value.length < 4) {
                      return 'Mínimo 4 caracteres';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content:
                                Text('Registro exitoso. Ahora inicia sesión.'),
                          ),
                        );
                        Navigator.pop(context);
                      }
                    },
                    icon: const Icon(Icons.person_add),
                    label: const Text('Registrarse'),
                  ),
                ),
                const SizedBox(height: 12),
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('¿Ya tienes cuenta? Inicia sesión'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================
// MENÚ PRINCIPAL (lista los 4 ejercicios)
// ============================================================
class MenuPrincipalPage extends StatelessWidget {
  const MenuPrincipalPage({super.key});

  @override
  Widget build(BuildContext context) {
    final options = [
      {
        'title': 'Ejercicio 1: Lista con imágenes',
        'subtitle': 'ListView con imágenes, fuentes y categorías',
        'route': '/ejercicio1',
        'icon': Icons.list_alt,
      },
      {
        'title': 'Ejercicio 2: Detalle de producto',
        'subtitle': 'Card con imagen, precio y descripción',
        'route': '/ejercicio2',
        'icon': Icons.shopping_bag,
      },
      {
        'title': 'Ejercicio 3: Galería de imágenes',
        'subtitle': 'PNG, JPEG y SVG con flutter_svg',
        'route': '/ejercicio3',
        'icon': Icons.photo_library,
      },
      {
        'title': 'Ejercicio 4: Productos',
        'subtitle': 'Registrar y listar productos',
        'route': '/listarProductos',
        'icon': Icons.inventory_2,
      },
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Menú Principal - Laboratorio')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.check_circle,
                    color: Colors.green.shade600, size: 20),
                const SizedBox(width: 8),
                Text(
                  'Sesión iniciada correctamente',
                  style: GoogleFonts.roboto(
                    fontSize: 14,
                    color: Colors.green.shade600,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Selecciona un ejercicio',
              style: GoogleFonts.montserrat(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: options.length,
                itemBuilder: (context, index) {
                  final item = options[index];
                  return Card(
                    child: ListTile(
                      leading: CircleAvatar(
                        backgroundColor: Theme.of(context)
                            .colorScheme
                            .primary
                            .withValues(alpha: 0.12),
                        child: Icon(
                          item['icon'] as IconData,
                          color: Theme.of(context).colorScheme.primary,
                        ),
                      ),
                      title: Text(
                        item['title'] as String,
                        style: GoogleFonts.montserrat(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      subtitle: Text(
                        item['subtitle'] as String,
                        style: GoogleFonts.lato(),
                      ),
                      trailing: const Icon(Icons.arrow_forward_ios_rounded),
                      onTap: () => Navigator.pushNamed(
                        context,
                        item['route'] as String,
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: () {
                  Navigator.pushReplacementNamed(context, '/login');
                },
                icon: const Icon(Icons.logout),
                label: const Text('Cerrar Sesión'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: Colors.red.shade600,
                  side: BorderSide(color: Colors.red.shade600),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ============================================================
// EJERCICIO 1: Lista con imágenes
// ============================================================
class CategoriaItem {
  final String nombre;
  final String categoria;
  final String imageUrl;
  final bool isNetwork;

  const CategoriaItem({
    required this.nombre,
    required this.categoria,
    required this.imageUrl,
    required this.isNetwork,
  });
}

class EjercicioListaPage extends StatelessWidget {
  const EjercicioListaPage({super.key});

  TextStyle _styleByCategory(String categoria) {
    switch (categoria) {
      case 'Alimentos':
        return GoogleFonts.openSans(fontSize: 20, fontWeight: FontWeight.w700);
      case 'Animales':
        return GoogleFonts.lato(fontSize: 20, fontWeight: FontWeight.w700);
      case 'Lugares':
        return GoogleFonts.ubuntu(fontSize: 20, fontWeight: FontWeight.w700);
      default:
        return GoogleFonts.roboto(fontSize: 20, fontWeight: FontWeight.w700);
    }
  }

  @override
  Widget build(BuildContext context) {
    const items = [
      CategoriaItem(
        nombre: 'Manzana',
        categoria: 'Alimentos',
        imageUrl:
            'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
      CategoriaItem(
        nombre: 'Pizza',
        categoria: 'Alimentos',
        imageUrl:
            'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
      CategoriaItem(
        nombre: 'León',
        categoria: 'Animales',
        imageUrl:
            'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
      CategoriaItem(
        nombre: 'Tucán',
        categoria: 'Animales',
        imageUrl:
            'https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
      CategoriaItem(
        nombre: 'Machu Picchu',
        categoria: 'Lugares',
        imageUrl:
            'https://images.unsplash.com/photo-1587595431973-160d0d94adb1?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
      CategoriaItem(
        nombre: 'París',
        categoria: 'Lugares',
        imageUrl:
            'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=600&q=80',
        isNetwork: true,
      ),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Ejercicio 1 - Lista con imágenes')),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          return Card(
            child: ListTile(
              leading: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  item.imageUrl,
                  width: 60,
                  height: 60,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => _imageFallback(),
                ),
              ),
              title: Text(item.nombre, style: _styleByCategory(item.categoria)),
              subtitle: Text(
                item.categoria,
                style: GoogleFonts.roboto(fontSize: 14),
              ),
              trailing: const Icon(Icons.chevron_right_rounded),
            ),
          );
        },
      ),
    );
  }

  Widget _imageFallback() {
    return Container(
      width: 60,
      height: 60,
      color: Colors.grey.shade300,
      alignment: Alignment.center,
      child: const Icon(Icons.image_not_supported),
    );
  }
}

// ============================================================
// EJERCICIO 2: Detalle de producto
// ============================================================
class DetalleProductoPage extends StatelessWidget {
  const DetalleProductoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ejercicio 2 - Detalle de producto')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Image.network(
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
                    height: 250,
                    width: double.infinity,
                    fit: BoxFit.cover,
                    errorBuilder: (_, __, ___) => Container(
                      height: 250,
                      color: Colors.grey.shade300,
                      alignment: Alignment.center,
                      child: const Icon(Icons.broken_image, size: 60),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                Text(
                  'Zapatillas Urban Runner',
                  style: GoogleFonts.montserrat(
                    fontSize: 26,
                    fontWeight: FontWeight.w800,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'S/ 249.90',
                  style: GoogleFonts.roboto(
                    fontSize: 24,
                    fontWeight: FontWeight.w700,
                    color: Colors.green.shade700,
                  ),
                ),
                const SizedBox(height: 14),
                Text(
                  'Calzado deportivo y casual, ideal para caminatas largas y uso diario. Cuenta con diseño moderno, suela antideslizante y material transpirable para mayor comodidad.',
                  style: GoogleFonts.nunito(
                    fontSize: 18,
                    height: 1.5,
                    color: Colors.black87,
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Producto agregado correctamente'),
                        ),
                      );
                    },
                    icon: const Icon(Icons.shopping_cart_checkout),
                    label: const Text('Agregar al carrito'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================
// EJERCICIO 3: Galería de imágenes
// ============================================================
class GaleriaItem {
  final String nombre;
  final String tipo;
  final String path;
  final bool isSvg;
  final bool isNetwork;

  const GaleriaItem({
    required this.nombre,
    required this.tipo,
    required this.path,
    required this.isSvg,
    this.isNetwork = false,
  });
}

class GaleriaImagenesPage extends StatelessWidget {
  const GaleriaImagenesPage({super.key});

  TextStyle _fontByType(String tipo) {
    switch (tipo) {
      case 'PNG':
        return const TextStyle(
          fontFamily: 'Arial',
          fontSize: 18,
          fontWeight: FontWeight.bold,
        );
      case 'JPEG':
        return const TextStyle(
          fontFamily: 'Times New Roman',
          fontSize: 18,
          fontWeight: FontWeight.bold,
        );
      case 'SVG':
        return GoogleFonts.roboto(fontSize: 18, fontWeight: FontWeight.bold);
      default:
        return GoogleFonts.roboto(fontSize: 18, fontWeight: FontWeight.bold);
    }
  }

  @override
  Widget build(BuildContext context) {
    const items = [
      GaleriaItem(
        nombre: 'Logo Flutter PNG',
        tipo: 'PNG',
        path:
            'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Paisaje JPEG',
        tipo: 'JPEG',
        path:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Estrella SVG',
        tipo: 'SVG',
        path: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/star.svg',
        isSvg: true,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Montañas PNG',
        tipo: 'PNG',
        path:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Mar JPEG',
        tipo: 'JPEG',
        path:
            'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Círculo SVG',
        tipo: 'SVG',
        path:
            'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/circle.svg',
        isSvg: true,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Ciudad PNG',
        tipo: 'PNG',
        path:
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Bosque JPEG',
        tipo: 'JPEG',
        path:
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
        isSvg: false,
        isNetwork: true,
      ),
      GaleriaItem(
        nombre: 'Rectángulo SVG',
        tipo: 'SVG',
        path: 'https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/rect.svg',
        isSvg: true,
        isNetwork: true,
      ),
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Ejercicio 3 - Galería de imágenes')),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 0.85,
        ),
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                children: [
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(14),
                      child: item.isSvg
                          ? (item.isNetwork
                              ? SvgPicture.network(item.path,
                                  fit: BoxFit.contain)
                              : SvgPicture.asset(item.path,
                                  fit: BoxFit.contain))
                          : (item.isNetwork
                              ? Image.network(item.path, fit: BoxFit.cover)
                              : Image.asset(item.path, fit: BoxFit.cover)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    item.nombre,
                    textAlign: TextAlign.center,
                    style: _fontByType(item.tipo),
                  ),
                  const SizedBox(height: 6),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: Theme.of(context)
                          .colorScheme
                          .primary
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Text(
                      item.tipo,
                      style: GoogleFonts.roboto(
                        color: Theme.of(context).colorScheme.primary,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

// ============================================================
// EJERCICIO 4: Productos (Registrar y Listar)
// ============================================================
class Producto {
  final String nombre;
  final String descripcion;
  final double precio;
  final String imagenUrl;

  const Producto({
    required this.nombre,
    required this.descripcion,
    required this.precio,
    required this.imagenUrl,
  });
}

class ProductRegisterPage extends StatefulWidget {
  const ProductRegisterPage({super.key});

  @override
  State<ProductRegisterPage> createState() => _ProductRegisterPageState();
}

class _ProductRegisterPageState extends State<ProductRegisterPage> {
  final _nombreController = TextEditingController();
  final _descripcionController = TextEditingController();
  final _precioController = TextEditingController();
  final _imagenController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    _nombreController.dispose();
    _descripcionController.dispose();
    _precioController.dispose();
    _imagenController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Registrar Producto')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Nuevo Producto',
                style: GoogleFonts.montserrat(
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _nombreController,
                decoration: InputDecoration(
                  labelText: 'Nombre del producto',
                  prefixIcon: const Icon(Icons.shopping_bag),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Ingrese el nombre';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descripcionController,
                decoration: InputDecoration(
                  labelText: 'Descripción',
                  prefixIcon: const Icon(Icons.description),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                maxLines: 3,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Ingrese la descripción';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _precioController,
                decoration: InputDecoration(
                  labelText: 'Precio (S/)',
                  prefixIcon: const Icon(Icons.monetization_on),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                keyboardType: TextInputType.number,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Ingrese el precio';
                  }
                  if (double.tryParse(value) == null) {
                    return 'Precio inválido';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _imagenController,
                decoration: InputDecoration(
                  labelText: 'URL de la imagen',
                  prefixIcon: const Icon(Icons.image),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                  hintText: 'https://images.unsplash.com/...',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Ingrese la URL de la imagen';
                  }
                  if (!value.startsWith('http')) {
                    return 'URL inválida';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      final producto = Producto(
                        nombre: _nombreController.text,
                        descripcion: _descripcionController.text,
                        precio: double.parse(_precioController.text),
                        imagenUrl: _imagenController.text,
                      );
                      ProductoListaPage.agregarProducto(producto);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Producto registrado correctamente'),
                        ),
                      );
                      _nombreController.clear();
                      _descripcionController.clear();
                      _precioController.clear();
                      _imagenController.clear();
                    }
                  },
                  icon: const Icon(Icons.save),
                  label: const Text('Guardar Producto'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ProductoListaPage extends StatefulWidget {
  const ProductoListaPage({super.key});

  static final List<Producto> _productos = [
    const Producto(
      nombre: 'Zapatillas Urban Runner',
      descripcion: 'Calzado deportivo y casual, ideal para caminatas largas.',
      precio: 249.90,
      imagenUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    ),
    const Producto(
      nombre: 'Auriculares Bluetooth',
      descripcion: 'Auriculares inalámbricos con cancelación de ruido.',
      precio: 189.50,
      imagenUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    ),
    const Producto(
      nombre: 'Mochila Viajera',
      descripcion: 'Mochila impermeable con múltiples compartimentos.',
      precio: 129.00,
      imagenUrl:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    ),
  ];

  static void agregarProducto(Producto producto) {
    _productos.add(producto);
  }

  @override
  State<ProductoListaPage> createState() => _ProductoListaPageState();
}

class _ProductoListaPageState extends State<ProductoListaPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Lista de Productos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => Navigator.pushNamed(context, '/registrarProducto'),
            tooltip: 'Registrar producto',
          ),
        ],
      ),
      body: ProductoListaPage._productos.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.inventory_2,
                      size: 80, color: Colors.grey.shade400),
                  const SizedBox(height: 16),
                  Text(
                    'No hay productos registrados',
                    style: GoogleFonts.roboto(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: () =>
                        Navigator.pushNamed(context, '/registrarProducto'),
                    icon: const Icon(Icons.add),
                    label: const Text('Registrar producto'),
                  ),
                ],
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.all(12),
              itemCount: ProductoListaPage._productos.length,
              itemBuilder: (context, index) {
                final producto = ProductoListaPage._productos[index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  child: ListTile(
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.network(
                        producto.imagenUrl,
                        width: 60,
                        height: 60,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Container(
                          width: 60,
                          height: 60,
                          color: Colors.grey.shade300,
                          child: const Icon(Icons.broken_image),
                        ),
                      ),
                    ),
                    title: Text(
                      producto.nombre,
                      style: GoogleFonts.montserrat(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          producto.descripcion,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.roboto(fontSize: 13),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'S/ ${producto.precio.toStringAsFixed(2)}',
                          style: GoogleFonts.roboto(
                            fontWeight: FontWeight.w700,
                            color: Colors.green.shade700,
                          ),
                        ),
                      ],
                    ),
                    isThreeLine: true,
                  ),
                );
              },
            ),
    );
  }
}
