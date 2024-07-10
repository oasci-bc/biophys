# Diffusion Coefficient

**Diffusion Coefficient (D)** quantifies the rate at which particles move through a fluid. It is a crucial parameter in understanding how particles disperse over time.

The diffusion coefficient measures how fast particles spread out in a fluid. It's like observing how quickly a drop of ink disperses in a glass of water.

**Key Points:**

-   **Rate of Spread**: The diffusion coefficient indicates how quickly particles move through the fluid.
    Higher diffusion coefficients mean faster spreading.
-   **Dependence on Temperature and Viscosity**: The diffusion coefficient is directly proportional to temperature and inversely proportional to the viscosity of the fluid.

## Mathematical Explanation

The Stokes-Einstein equation relates the diffusion coefficient to the hydrodynamic diameter ($R_H$) of the particles:

$$
D = \frac{k_B T}{6 \pi \eta R_H}
$$

Where:

-   $k_B$ is the Boltzmann constant ($1.380 \times 10^{-23} \, \text{J/K}$),
-   $T$ is the absolute temperature (in Kelvin),
-   $\eta$ is the viscosity of the fluid (in Pa·s),
-   $R_H$ is the hydrodynamic radius of the particle (in meters).

## Worked Example

A suspension of nanoparticles in water is maintained at $298 \, \text{K}$ (25°C).
The viscosity of water is $0.89 \times 10^{-3} \, \text{Pa} \cdot \text{s}$.

The diffusion coefficient $D$ is measured to be $1.43 \times 10^{-12} \, \text{m}^2/\text{s}$.

Using the Stokes-Einstein equation

$$
R_H = \frac{k_B T}{6 \pi \eta D} = \frac{1.38 \times 10^{-23} \, \text{J/K} \times 298 \, \text{K}}{6 \pi \times 0.89 \times 10^{-3} \, \text{Pa} \cdot \text{s} \times 1.43 \times 10^{-12} \, \text{m}^2/\text{s}} \approx 6.1 \times 10^{-9} \, \text{m} = 61 \, \text{nm}
$$

## Self-Assessment Questions

1.  How does the viscosity of a fluid affect the diffusion coefficient of particles suspended in it?

    ??? note "Answer"

        The viscosity of the fluid affects how easily the particles can move; higher viscosity means more resistance to motion, resulting in a lower diffusion coefficient.

2.  Why is the diffusion coefficient temperature-dependent?

    ??? note "Answer"

        The diffusion coefficient is temperature-dependent because higher temperatures increase the kinetic energy of the fluid molecules, leading to more vigorous collisions and faster particle movement.

3.  Given a fluid with viscosity $\eta = 1.0 \times 10^{-3} \, \text{Pa} \cdot \text{s}$ and temperature $T = 300 \, \text{K}$, calculate the diffusion coefficient for particles with a hydrodynamic radius of $50 \, \text{nm}$.

    ??? note "Answer"

        Using the Stokes-Einstein equation

        $$
        D = \frac{k_B T}{6 \pi \eta R_H} = \frac{1.38 \times 10^{-23} \, \text{J/K} \times 300 \, \text{K}}{6 \pi \times 1.0 \times 10^{-3} \, \text{Pa} \cdot \text{s} \times 50 \times 10^{-9} \, \text{m}} \approx 1.1 \times 10^{-12} \, \text{m}^2/\text{s}
        $$

4.  If the diffusion coefficient is $1.33 \times 10^{-12} \, \text{m}^2/\text{s}$, what is the hydrodynamic radius of the particles?

    ??? note "Answer"

        Rearranging the Stokes-Einstein equation to solve for $R_H$

        $$
        R_H = \frac{k_B T}{6 \pi \eta D} = \frac{1.38 \times 10^{-23} \, \text{J/K} \times 300 \, \text{K}}{6 \pi \times 1.0 \times 10^{-3} \, \text{Pa} \cdot \text{s} \times 1.33 \times 10^{-12} \, \text{m}^2/\text{s}} \approx 5.5 \times 10^{-9} \, \text{m} = 55 \, \text{nm}
        $$
