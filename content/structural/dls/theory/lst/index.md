# Light Scattering Theory

When a laser beam illuminates a sample, particles scatter the light in all directions. The intensity and angle of the scattered light depend on the particle size and shape. In DLS, the intensity fluctuations of the scattered light are measured over time, providing information about the diffusion coefficient and hence the size of the particles.

The wave vector \( q \) in light scattering is given by:
\[ q = \frac{4 \pi n}{\lambda} \sin\left(\frac{\theta}{2}\right) \]
where:
- \( \lambda \) is the wavelength of the incident light in vacuum,
- \( n \) is the refractive index of the medium,
- \( \theta \) is the scattering angle.

## Autocorrelation Function

The autocorrelation function describes the correlation between the intensity of scattered light at different times. It decays as the time difference increases, with the rate of decay providing information about the particle's diffusion coefficient.

For monodisperse particles, the autocorrelation function \( g_2(\tau) \) can be represented as:
\[ g_2(\tau) = 1 + \beta e^{-2\Gamma\tau} \]
where:
- \( \tau \) is the delay time,
- \( \beta \) is an instrument-dependent coherence factor,
- \( \Gamma \) is the decay constant related to the diffusion coefficient \( D \) by \( \Gamma = D q^2 \).

For polydisperse particles, the autocorrelation function is a weighted sum of exponential decays:
\[ g_2(\tau) = 1 + \beta \int_0^\infty G(\Gamma) e^{-2\Gamma\tau} d\Gamma \]
where \( G(\Gamma) \) is the distribution of decay rates.

## Stokes-Einstein Equation

The Stokes-Einstein equation relates the diffusion coefficient to the hydrodynamic diameter (\( D_H \)) of the particles:
\[ D_H = \frac{k_B T}{3 \pi \eta D} \]
This equation allows for the determination of particle size from the measured diffusion coefficient, assuming spherical particles and knowledge of the solvent viscosity and temperature.
