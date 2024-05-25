# AlphaFold

AlphaFold[^senior2020improved] is a deep learning-based protein structure prediction system that leverages information from multiple sequence alignments (MSAs) and a novel neural network architecture to accurately predict protein structures.
This version was released in 2020 and its pipeline consists of four main stages: [feature extraction](#feature-extraction), [neural network inference](#neural-network-architecture), [potential construction](#potential-construction), and [structure realization](#structure-realization).

- AlphaFold extracts features from the target protei0n sequence and its MSA, which captures covariation information from homologous sequences.
- The input features include one-hot encoded amino acid sequences, position-specific substitution matrices (PSSMs), and covariation features derived from the MSA.

Neural network architecture

- The core of AlphaFold is a deep residual convolutional neural network that predicts a probability distribution over the distances between pairs of residues (distogram).
- The network also makes auxiliary predictions, such as secondary structure, solvent accessibility, and torsion angles, which help guide the structure prediction process.

Potential construction

- AlphaFold constructs a smooth potential by combining the predicted distance distributions with a reference state and a steric repulsion term.
- The potential also incorporates information from the predicted torsion angles, ensuring that the generated structures are physically plausible.

Structure realization

- The final stage involves generating protein structures that minimize the constructed potential.
- AlphaFold initializes the backbone torsion angles by sampling from the predicted distributions and then optimizes the structure using gradient descent.
- The optimization process is repeated with "noisy" restarts to explore the conformational space and identify low-energy structures.

The following sections will delve deeper into each stage of the AlphaFold pipeline, providing a detailed understanding of how the system achieves state-of-the-art performance in protein structure prediction.

## Feature Extraction

### Multiple Sequence Alignments (MSAs)

1. Importance of MSAs in capturing covariation information
    a. Evolutionary relationships between homologous sequences
    b. Covariation: Correlated mutations across multiple sequences
    c. Inferring structural information from covariation patterns
    [Figure: Schematic illustration of an MSA, highlighting covarying positions]

2. Generating MSAs using HHblits and UniClust30 database
    a. HHblits: Iterative homology detection using hidden Markov models
    b. UniClust30: Clustered protein sequence database for efficient search
    c. Iterative search process to gather diverse homologous sequences
    [Figure: Flowchart of the MSA generation process using HHblits and UniClust30]

3. Data augmentation techniques
    a. MSA subsampling: Randomly selecting subsets of sequences
    b. Importance of subsampling for robustness and generalization
    c. Generating multiple MSA samples for each target protein
    [Figure: Illustration of MSA subsampling, showing different subsets of sequences]

### Input features

1. Sequence features
a. One-hot encoding of amino acid sequences
    i. Representing each amino acid as a binary vector
    ii. Capturing residue identity information
    [Figure: Example of one-hot encoding for a short amino acid sequence]

b. Position-specific substitution matrices (PSSMs) from PSI-BLAST
    i. Capturing evolutionary conservation and substitution patterns
    ii. Incorporating information from distant homologs
    [Figure: Heatmap visualization of a PSSM, showing amino acid substitution scores]

c. Hidden Markov Model (HMM) profiles from HHblits
    i. Representing sequence profiles based on homologous sequences
    ii. Capturing position-specific amino acid frequencies and insertion/deletion probabilities
    [Figure: Schematic representation of an HMM profile, showing match, insert, and delete states]

2. Covariation features
    a. Potts model parameters
        i. Pairwise statistical coupling between residue positions
        ii. Inferring direct couplings from observed covariation patterns
        [Figure: Heatmap visualization of Potts model parameters, showing pairwise residue couplings]

    b. Frobenius norm of the Potts model parameters
        i. Summarizing the overall strength of covariation signal
        ii. Providing a single feature value for each residue pair
        [Figure: Equation for calculating the Frobenius norm of Potts model parameters]

3. Structural templates (not used in the fully de novo AlphaFold model)
    a. Identifying structural templates from the Protein Data Bank (PDB)
    b. Extracting template-based distance restraints and torsion angles
    c. Incorporating template information in the input features (when available)
    [Figure: Schematic illustration of template-based distance restraints and torsion angles]

## Neural network architecture

### Deep residual convolutional network

1. Advantages of using a deep network
    a. Capturing complex sequence-structure relationships
    b. Learning hierarchical features at different scales
    c. Enabling end-to-end learning from sequence to structure
    [Figure: Schematic overview of the deep residual convolutional network architecture]
1. Residual connections and their importance
    a. Allowing gradients to flow directly through the network
    b. Mitigating the vanishing gradient problem in deep networks
    c. Facilitating the training of very deep architectures
    [Figure: Illustration of a residual block, highlighting the skip connection]
1. Dilated convolutions for capturing long-range interactions
    a. Expanding the receptive field without losing resolution
    b. Capturing dependencies between distant residues
    c. Efficiently processing large input feature maps
    [Figure: Visualization of dilated convolutions with different dilation rates]

### Distogram prediction

1. Predicting discrete probability distributions over distances between residue pairs
    a. Representing distances as a probability distribution
    b. Capturing uncertainty and multimodality in distance predictions
    c. Enabling the modeling of complex spatial relationships
    [Figure: Example of a predicted distogram, showing probability distributions for each residue pair]
1. Bin resolution and distance range
    a. Using a fine-grained 64-bin output to represent distance distributions
    b. Covering distances from 2 to 22 Angstroms
    c. Balancing resolution and computational efficiency
    [Figure: Illustration of the 64-bin distance range and corresponding Angstrom values]
1. Handling sparse distance maps using a cropping strategy
    a. Cropping the distance map into fixed-size regions
    b. Enabling efficient processing of long sequences
    c. Preserving local context while reducing memory requirements
    [Figure: Schematic representation of the cropping strategy applied to a distance map]

### Auxiliary predictions

1. Secondary structure prediction
    a. Predicting 8-class secondary structure labels (3-state + 8-state)
    b. Incorporating secondary structure information in the distance prediction
    c. Improving the overall accuracy of the structure prediction
    [Figure: Example of predicted secondary structure probabilities for a protein sequence]
1. Solvent accessibility prediction
    a. Predicting relative solvent accessibility for each residue
    b. Providing information about the exposure of residues to the solvent
    c. Aiding in the modeling of surface residues and interactions
    [Figure: Visualization of predicted solvent accessibility scores mapped onto a protein structure]
1. Torsion angle prediction
    a. Predicting φ (phi) and ψ (psi) torsion angles for each residue
    b. Using a von Mises distribution to model angular distributions
    c. Guiding the backbone conformation during structure realization
    [Figure: Ramachandran plot showing predicted torsion angle distributions for a protein]

## Potential Construction

## Distance-based potential

1. Deriving a smooth potential using spline interpolation
    a. Converting discrete distance probabilities to a continuous potential
    b. Using cubic spline interpolation for smoothness
    c. Enabling gradient-based optimization during structure realization
    [Figure: Illustration of the spline interpolation process, showing discrete probabilities and the resulting smooth potential]
1. Incorporating a reference state to account for background distributions
    a. Modeling the background distribution of distances based on sequence length and amino acid composition
    b. Subtracting the reference state potential from the predicted potential
    c. Enhancing the specificity of the distance-based potential
    [Figure: Comparison of the predicted and reference state distance potentials]

### Torsion angle potential

1. Using a von Mises distribution to model torsion angle preferences
    a. Representing torsion angles as a continuous probability distribution
    b. Capturing the preferred φ (phi) and ψ (psi) angles for each residue
    c. Incorporating backbone conformational preferences in the potential
    [Figure: Example of a von Mises distribution fitted to predicted torsion angle probabilities]
1. Combining φ and ψ angle potentials for each residue
    a. Treating φ and ψ angles as independent variables
    b. Summing the negative log-likelihoods of the von Mises distributions
    c. Creating a joint torsion angle potential for each residue
    [Figure: Equation for combining φ and ψ angle potentials]

### Steric repulsion potential

1. Incorporating Rosetta's VdW term (V_score2_smooth) to prevent clashes
    a. Using a simplified Lennard-Jones potential to model atomic repulsion
    b. Preventing unrealistic overlaps between non-bonded atoms
    c. Ensuring physically plausible structures during optimization
    [Figure: Illustration of the steric repulsion potential, showing the energy as a function of atomic distance]
1. Efficient computation of the steric repulsion potential
    a. Using a coarse-grained representation of the protein (e.g., Cβ atoms)
    b. Employing distance-dependent cutoffs for computational efficiency
    c. Balancing accuracy and speed in the potential evaluation
    [Figure: Schematic representation of the coarse-grained protein model used for steric repulsion calculations]

### Combining potentials and weighting scheme

1. Weighted sum of distance, torsion, and steric potentials
    a. Assigning weights to each potential term
    b. Balancing the contributions of different energy components
    c. Creating a unified objective function for structure optimization
    [Figure: Equation showing the weighted sum of potential terms]
1. Determining optimal weights through cross-validation
    a. Testing different weight combinations on a validation set
    b. Selecting the weights that yield the best structure prediction performance
    c. Ensuring robustness and generalization of the potential
    [Figure: Heatmap showing the cross-validation performance for different weight combinations]

## Structure Realization

### Initialization of backbone torsion angles

1. Sampling from predicted torsion angle distributions
    a. Generating diverse initial conformations
    b. Ensuring compatibility with the predicted torsion angle preferences
    c. Exploring the conformational space effectively
    [Figure: Illustration of the sampling process, showing multiple initial conformations]
1. Assigning initial torsion angles to the protein backbone
    a. Using the predicted φ (phi) and ψ (psi) angles for each residue
    b. Constructing a coarse-grained backbone representation
    c. Preparing the structure for optimization
    [Figure: Schematic representation of the initial backbone conformation with assigned torsion angles]

### Optimization using gradient descent

1. L-BFGS algorithm for minimizing the total potential
    a. Employing a quasi-Newton optimization method
    b. Approximating the inverse Hessian matrix for efficient gradient descent
    c. Handling large-scale optimization problems with limited memory requirements
    [Figure: Flowchart of the L-BFGS optimization process]
1. Efficient computation of gradients using the differentiable geometric unit
    a. Representing the protein geometry using a differentiable framework
    b. Enabling gradient flow from the potential to the torsion angles
    c. Allowing for end-to-end optimization of the structure
    [Figure: Schematic representation of the differentiable geometric unit, showing the relationship between torsion angles and Cartesian coordinates]
1. Iterative refinement using "noisy" restarts
    a. Perturbing the optimized structure with random torsion angle noise
    b. Restarting the optimization process from the perturbed conformation
    c. Escaping local minima and exploring alternative structures
    [Figure: Illustration of the noisy restart process, showing multiple optimization trajectories]

### Model selection and ranking

1. Generating a pool of low-energy conformations
    a. Collecting structures from multiple optimization runs
    b. Filtering out high-energy and physically implausible conformations
    c. Retaining a diverse set of candidate structures
    [Figure: Energy landscape visualization, showing multiple low-energy conformations]
1. Ranking models based on the total potential energy
    a. Evaluating the final potential energy for each candidate structure
    b. Sorting the structures based on their energy values
    c. Selecting the lowest-energy conformation as the predicted structure
    [Figure: Bar plot showing the ranked candidate structures based on their potential energy]

### Full-atom refinement using Rosetta (optional)

1. Adding side-chain atoms to the predicted backbone
    a. Using Rosetta's side-chain packing algorithms
    b. Optimizing the side-chain conformations based on Rosetta's energy function
    c. Incorporating physical and statistical potentials for accurate side-chain placement
    [Figure: Illustration of the side-chain addition process, showing the transition from a coarse-grained to a full-atom model]
1. Refining the full-atom model using Rosetta's energy minimization
    a. Employing Rosetta's all-atom energy function (e.g., Talaris2014)
    b. Performing gradient-based minimization to optimize the structure
    c. Fine-tuning the predicted structure to improve its physical realism
    [Figure: Comparison of the structure before and after the full-atom refinement step]

## Conclusion and Future Directions

### Recap of AlphaFold's key innovations

1. Deep learning architecture for accurate prediction of protein structures
    a. Highlighting the success of the deep residual convolutional network in capturing complex sequence-structure relationships
    b. Emphasizing the importance of the distogram prediction and auxiliary tasks in guiding the structure prediction process
    [Figure: Schematic overview of AlphaFold's key architectural components and their contributions to the overall performance]
1. Incorporation of coevolutionary information from multiple sequence alignments
    a. Reiterating the significance of MSAs in providing valuable evolutionary constraints
    b. Discussing the effectiveness of AlphaFold's approach in leveraging coevolutionary information for structure prediction
    [Figure: Illustration of how coevolutionary information from MSAs is integrated into AlphaFold's prediction pipeline]
1. Construction of a differentiable potential for gradient-based optimization
    a. Summarizing the novelty of AlphaFold's potential construction approach, combining distance, torsion, and steric terms
    b. Highlighting the advantages of a differentiable potential for efficient gradient-based optimization
    [Figure: Schematic representation of AlphaFold's differentiable potential and its role in the structure realization process]

### Potential applications of improved protein structure prediction

1. Accelerating protein structure determination and understanding protein function
    a. Discussing how AlphaFold's accurate predictions can complement and guide experimental structure determination efforts
    b. Highlighting the potential of predicted structures in providing insights into protein function and mechanisms
    [Figure: Examples of how AlphaFold's predictions can be used to understand protein function and guide experimental studies]
1. Facilitating rational drug design and targeted therapeutics
    a. Explaining the importance of protein structures in the drug discovery process
    b. Illustrating how AlphaFold's predictions can aid in the identification of drug targets and the design of targeted therapeutics
    [Figure: Case studies showcasing the application of AlphaFold's predictions in rational drug design and the development of targeted therapies]
1. Enabling large-scale structural characterization of proteomes
    a. Discussing the potential of AlphaFold in predicting structures for entire proteomes, including proteins that are difficult to study experimentally
    b. Highlighting the implications of large-scale structural characterization for understanding cellular processes and disease mechanisms
    [Figure: Visualization of a predicted structural proteome, emphasizing the scale and diversity of structures that can be characterized using AlphaFold]

### Limitations and areas for further improvement

1. Addressing the challenges of predicting structures for large multi-domain proteins and protein complexes
    a. Discussing the current limitations of AlphaFold in handling large multi-domain proteins and protein-protein interactions
    b. Identifying potential strategies for extending AlphaFold's capabilities to accurately predict structures of these challenging targets
    [Figure: Examples of large multi-domain proteins and protein complexes that pose challenges for current structure prediction methods]
1. Improving the interpretability and biological plausibility of predicted structures
    a. Highlighting the need for further validation and refinement of AlphaFold's predictions to ensure their biological relevance
    b. Discussing potential approaches for incorporating additional experimental constraints and biological knowledge into the prediction process
    [Figure: Schematic representation of the integration of experimental data and biological knowledge to improve the interpretability and plausibility of predicted structures]
1. Incorporating information about protein dynamics and conformational flexibility
    a. Acknowledging the limitations of current structure prediction methods in capturing protein dynamics and conformational flexibility
    b. Discussing potential avenues for extending AlphaFold to predict multiple conformational states and model protein dynamics
    [Figure: Illustration of protein conformational flexibility and the potential for AlphaFold to predict multiple conformational states]

<!-- REFERENCES -->

[^senior2020improved]: Senior, A. W., Evans, R., Jumper, J., Kirkpatrick, J., Sifre, L., Green, T., ... & Hassabis, D. (2020). Improved protein structure prediction using potentials from deep learning. *Nature, 577*(7792), 706-710. DOI: [10.1038/s41586-019-1923-7](https://doi.org/10.1038/s41586-019-1923-7)
