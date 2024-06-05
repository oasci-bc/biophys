# Light Scattering Theory

Dynamic light scattering (DLS) is a powerful technique used to determine the size distribution of small particles in suspension or polymers in solution.
At the heart of DLS lies the phenomenon of Rayleigh scattering, which occurs when light interacts with particles much smaller than its wavelength.

## Rayleigh scattering basics

Rayleigh scattering is an elastic scattering process, meaning that the scattered light has the same frequency (and thus, the same energy) as the incident light.
In DLS, Rayleigh scattering occurs when the laser light interacts with particles that are typically less than one-tenth of the light's wavelength, such as nanoparticles or macromolecules in a liquid.
When the laser light hits these small particles, the oscillating electric field of the light induces an oscillating dipole moment in the particles.
The oscillating dipole moment causes the particles to radiate scattered light in all directions, acting as point-like scatterers.

The intensity of the scattered light depends on several factors, including the size of the particles, the wavelength of the light, and the scattering angle.
In DLS, the intensity of the scattered light ($I$) due to Rayleigh scattering is proportional to the sixth power of the particle diameter ($d^6$) and inversely proportional to the fourth power of the wavelength ($\lambda^4$):

$$
I \propto \frac{d^6}{\lambda^4}
$$

This relationship has important implications for DLS measurements:

-   Smaller particles scatter light less intensely than larger ones.
    As the particle size decreases, the scattering intensity decreases dramatically, making it more challenging to detect very small particles.
-   The wavelength of the laser light affects the scattering intensity.
    Using shorter wavelengths (e.g., blue light) can enhance the scattering intensity, improving the sensitivity of DLS measurements.

## Intensity fluctuations and brownian motion

In DLS, the scattered light intensity fluctuates over time due to the Brownian motion of the particles in the liquid.
The rate of these intensity fluctuations depends on the particle size and the viscosity of the solvent.
Smaller particles, with their higher diffusion coefficients, move more rapidly and cause faster fluctuations in the scattered light intensity.
Larger particles, with their lower diffusion coefficients, move more slowly and produce slower intensity fluctuations.
By analyzing the rate of these intensity fluctuations using an autocorrelation function, DLS can determine the diffusion coefficients and, consequently, the particle sizes.

The intensity and angle of the scattered light depend on the particle size and shape. In DLS, the intensity fluctuations of the scattered light are measured over time, providing information about the diffusion coefficient and hence the size of the particles.

The wave vector $q$ in light scattering is given by:

$$
q = \frac{4 \pi n}{\lambda} \sin\left(\frac{\theta}{2}\right)
$$

where:

- $\lambda$ is the wavelength of the incident light in vacuum,
- $n$ is the refractive index of the medium,
- $\theta$ is the scattering angle.


<div id="light-scatter-container"></div>
<script src="./light-scatter.js"></script>

## Autocorrelation Function

The autocorrelation function describes the correlation between the intensity of scattered light at different times. It decays as the time difference increases, with the rate of decay providing information about the particle's diffusion coefficient.

For monodisperse particles, the autocorrelation function $g_2(\tau)$ can be represented as:

$$
g_2(\tau) = 1 + \beta e^{-2\Gamma\tau}
$$

where:

-   $\tau$ is the delay time,
-   $\beta$ is an instrument-dependent coherence factor,
-   $\Gamma$ is the decay constant related to the diffusion coefficient $D$ by $\Gamma = D q^2$.

For polydisperse particles, the autocorrelation function is a weighted sum of exponential decays:

$$
g_2(\tau) = 1 + \beta \int_0^\infty G(\Gamma) e^{-2\Gamma\tau} d\Gamma
$$

where $G(\Gamma)$ is the distribution of decay rates.

## Stokes-Einstein Equation

The Stokes-Einstein equation relates the diffusion coefficient (D) obtained from DLS measurements to the hydrodynamic radius (R_h) of the particles:

$$
D = \frac{k_B  T}{6  \pi \eta R_h}
$$

Where:

-   $k_B$ is the Boltzmann constant
-   $T$ is the absolute temperature
-   $\eta$ is the viscosity of the solvent

By measuring the diffusion coefficient using DLS and applying the Stokes-Einstein equation, researchers can determine the size distribution of the particles in the sample.
