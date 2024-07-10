# Coevolution

TODO:

## Background on Protein Structure and Evolution

    A. Overview of protein folding and the sequence-structure relationship
       1. Protein structure hierarchy: primary, secondary, tertiary, and quaternary structure
       2. Thermodynamic and kinetic aspects of protein folding
       3. Experimental methods to study protein folding: spectroscopy, calorimetry, and single-molecule techniques
    B. Sequence determinants of protein structure
       1. Role of amino acid properties: size, charge, hydrophobicity, and polarity
       2. Secondary structure propensities of amino acids
       3. Local and global interactions stabilizing protein structure
    C. Evolutionary constraints on protein sequences
       1. Selective pressures for maintaining structure and function
       2. Mutation, selection, and drift in protein evolution
       3. Sequence conservation and variability across homologs
    D. Structural and functional diversity of protein families
       1. Evolutionary divergence and convergence of protein structures
       2. Relationship between sequence, structure, and function within protein families
       3. Examples of protein families with conserved structures and diverse functions

## Coevolution and Correlated Mutations

    A. Concept of coevolution in proteins
       1. Definition and theoretical basis
       2. Types of coevolution: pairwise, higher-order, and intramolecular
    B. Mechanisms of coevolution
       3. Structural constraints: maintaining contacts and interactions
       4. Functional constraints: preserving active sites and specificity
       5. Thermodynamic and kinetic constraints: ensuring stability and folding
    C. Correlated mutations as a signature of coevolution
       6. Definition and early observations
       7. Relationship to structural and functional constraints
       8. Examples of correlated mutations in protein families
    D. Challenges in detecting coevolution
       9. Distinguishing direct and indirect couplings
       10. Accounting for phylogenetic relationships and background conservation
       11. Dealing with statistical noise and limited data

## Inference of Coevolutionary Couplings
    A. Inputs for coevolutionary inference
       1. Multiple sequence alignments: construction and quality control
       2. Sequence weighting and resampling strategies
       3. Incorporating structural and functional information
    B. Covariation measures and scoring functions
       1. Local methods: mutual information, statistical coupling, and perturbation-based scores
       2. Global methods: maximum entropy, Bayesian networks, and machine learning
       3. Advantages and limitations of different approaches
    C. Direct Coupling Analysis (DCA) and related methods
       1. Theoretical foundations and mathematical formulation
       2. Mean-field approximation and pseudolikelihood maximization
       3. Gauge fixing and regularization techniques
       4. Sparse variants and computational optimizations
    D. Other key coevolution prediction methods
       1. Protein Sparse Inverse COVariance (PSICOV)
       2. Generative REgularized ModeLs of proteINs (GREMLIN)
       3. Coevolution-based Contact Prediction (CCMPred)
       4. Sparse inverse covariance estimation (SLICE) and graphical LASSO
    E. Performance evaluation and benchmarking
       1. Gold standard datasets: manually curated and structurally derived contacts
       2. Metrics: precision, recall, AUC, and rank-based scores
       3. Cross-validation and statistical significance assessment

## From Coevolution to Contacts
    A. Interpreting coevolutionary scores
       1. Relationship between coevolution and spatial proximity
       2. Distinguishing structural and functional couplings
       3. Identifying long-range and interchain contacts
    B. Contact definition and distance thresholds
       1. Atom-based and residue-based definitions
       2. Distance cutoffs for defining contacts: 8Å, 10Å, and others
       3. Considerations for different protein classes and folds
    C. Sequence separation and contact probability
       1. Local contacts: within 6-12 residues in sequence
       2. Medium-range contacts: between secondary structure elements
       3. Long-range contacts: between distant regions in sequence
    D. Typical performance of contact prediction methods
       1. Precision and coverage of top-ranked contacts
       2. Comparison across different protein families and alignment depths
       3. Challenges and opportunities for improvement

VII. Limitations and Frontiers
     A. Dependence on multiple sequence alignment quality
        1. Impact of alignment depth, diversity, and errors
        2. Strategies for improving alignment construction and robustness
     B. Challenges with specific protein classes
        3. Sparse alignments and orphan proteins
        4. Multidomain proteins and domain boundaries
        5. Protein-protein and protein-ligand complexes
     C. Disentangling evolutionary signals
        6. Phylogenetic corrections and background models
        7. Distinguishing structural and functional constraints
        8. Higher-order and epistatic interactions
     D. Integration with complementary data and methods
        9. Combining coevolution with experimental contacts and restraints
        10. Integrating with physicochemical knowledge and energy terms
        3. Hybrid approaches with machine learning and deep learning
     E. Improving interpretability and explainability
        4. Identifying functional sites and specificity determinants
        5. Inferring evolutionary histories and selective pressures
        6. Generating testable hypotheses and guiding experiments
     F. Future directions and opportunities
        7. Expanding to new protein families and evolutionary distances
        8. Modeling conformational dynamics and allostery
        9. Designing novel proteins with optimized properties

<!-- REFERENCES -->

[^gobel1994correlated]: Göbel, U., Sander, C., Schneider, R., & Valencia, A. (1994). Correlated mutations and residue contacts in proteins. *Proteins: Structure, Function, and Bioinformatics, 18*(4), 309-317.
[^shindyalov1994can]: Shindyalov, I. N., Kolchanov, N. A., & Sander, C. (1994). Can three-dimensional contacts in protein structures be predicted by analysis of correlated mutations? *Protein Engineering, Design and Selection, 7*(3), 349-358. DOI: [10.1093/protein/7.3.349](https://doi.org/10.1093/protein/7.3.349)
[^kamisetty2013assessing]: Kamisetty, H., Ovchinnikov, S., & Baker, D. (2013). Assessing the utility of coevolution-based residue–residue contact predictions in a sequence-and structure-rich era. *Proceedings of the National Academy of Sciences, 110*(39), 15674-15679. DOI: [10.1073/pnas.1314045110](https://doi.org/10.1073/pnas.1314045110)
[^sulkowska2012genomics]: Sułkowska, J. I., Morcos, F., Weigt, M., Hwa, T., & Onuchic, J. N. (2012). Genomics-aided structure prediction. *Proceedings of the National Academy of Sciences, 109*(26), 10340-10345. DOI: [10.1073/pnas.1207864109](https://doi.org/10.1073/pnas.1207864109)
[^morcos2011direct]: Morcos, F., Pagnani, A., Lunt, B., Bertolino, A., Marks, D. S., Sander, C., ... & Weigt, M. (2011). Direct-coupling analysis of residue coevolution captures native contacts across many protein families. *Proceedings of the National Academy of Sciences, 108*(49), E1293-E1301. DOI: [10.1073/pnas.1111471108](https://doi.org/10.1073/pnas.1111471108)
[^burger2008accurate]: Burger, L., & Van Nimwegen, E. (2008). Accurate prediction of protein–protein interactions from sequence alignments using a Bayesian method. *Molecular systems biology, 4*(1), 165. DOI: [10.1038/msb4100203](https://doi.org/10.1038/msb4100203)
[^burger2010disentangling]: Burger, L., & Van Nimwegen, E. (2010). Disentangling direct from indirect co-evolution of residues in protein alignments. *PLoS computational biology, 6*(1), e1000633. DOI: [10.1371/journal.pcbi.1000633](10.1371/journal.pcbi.1000633)
[^hockenberry2019evolutionary]: Hockenberry, A. J., & Wilke, C. O. (2019). Evolutionary couplings detect side-chain interactions. *PeerJ, 7*, e7280. DOI: [10.7717/peerj.7280](https://doi.org/10.7717/peerj.7280)
