import networkx as nx
import matplotlib.pyplot as plt
import community

class NetworkAnalysis:
    def __init__(self, G, characters_by_communities_reverse, names):
        self.colors = {'Gryffindor': 'red', 'Slytherin': 'darkgreen', 'Hufflepuff': 'orange', 'Ravenclaw': 'navy'} 
        self.G = G
        self.C = {val:self.colors[characters_by_communities_reverse[key]] for key, val in names.items() if key in characters_by_communities_reverse.keys()}

    def plot_density_distribution(self):
        G = self.G
        # colors = {'Gryffindor': 'red', 'Slytherin': 'darkgreen', 'Hufflepuff': 'orange', 'Ravenclaw': 'navy'} 
        edges = [data['weight'] for _, _, data in G.edges(data = True)]
        for _, _, data in G.edges(data = True):
            data['weight_norm'] = (data['weight'] - min(edges)) / (max(edges) - min(edges))
        partition1 = [set([node for node, data in G.nodes(data = True) if data['group'] == val]) for val in self.colors.values()]
        mod1 = nx.algorithms.community.quality.modularity(G,partition1, weight = 'weight_norm')
        mod2 = nx.algorithms.community.quality.modularity(G,partition1, weight = None)
        N = list(dict(G.in_degree()).values())
        M = list(dict(G.out_degree()).values())
        names_, _ = zip(*G.in_degree())
        cols = [self.C[name] for name in names_]
        modularity = []
        for i in range(1000):
            config_model = nx.generators.degree_seq.directed_configuration_model(N,M, create_using=nx.DiGraph())
            for i, (node, data) in enumerate(config_model.nodes(data = True)):
                data['group'] = cols[i]
            partition2 = [set([node for node, data in config_model.nodes(data = True) if data['group'] == val]) for val in self.colors.values()]

            modularity.append(nx.algorithms.community.quality.modularity(config_model,partition2, weight = None))
        fig, ax = plt.subplots(dpi = 150, figsize = (8,4))
        ax.hist(modularity, bins = 50, density = True, zorder = 3, alpha = .8, label = 'Modularity Density Distribution of config. model')
        ax.axvline(mod2, color = 'blue', label = 'True modularity of House splitting (no weights)')
        ax.axvline(mod1, color = 'red', label = 'True modularity of House splitting (with weights)')
        ax.grid(linestyle = '--', zorder = 0)
        ax.set_xlabel('Modularity')
        ax.set_ylabel('Probability Density')
        ax.set_title('Density Distribution of Modularity for Config. Model vs. True Modularity')
        ax.legend()
        plt.show()

    def louvain_comparison(self):
        G = self.G
        g = G.to_undirected().copy()
        for _, _, data in g.edges(data = True):
            data['weight'] = (data['weight'] - min(edges)) /(max(edges) - min(edges))
        P = community.best_partition(g)
        partition3 = [set() for i in range(max(P.values())+1)]
        for c, v in P.items():
            partition3[v].add(c)

        M = np.zeros((len(partition1), len(partition3)))
        for i in range(len(partition1)):
            for j in range(len(partition3)):
                M[i,j] = sum([name in partition3[j] for name in partition1[i]])/len(partition1[i])
        fig, ax = plt.subplots(dpi = 100, figsize = (10,5))
        plt.imshow(M)
        cbar = plt.colorbar(extend = 'both')
        cbar.set_label("Percentage of Hogwwarts House")
        ax.set_yticks(range(4))
        ax.set_yticklabels(list(self.colors.keys()))
        ax.set_title("Hogwarts House Split vs. Louvain Community Split")
        plt.show()

        print(f"The modularity of the Louvain Community Split was: {nx.algorithms.community.quality.modularity(g,partition3, weight = 'weight')}")

    def plot_degree_distribution(self):
        G = self.G
        fig, ax = plt.subplots(dpi = 100)
        names_, degree = zip(*G.degree())

        nbins = 30
        bins = np.logspace(1, np.log(max(degree)), nbins)
        hist, edges = np.histogram(degree, bins = bins, density = True )
        x = (edges[1:] + edges[:-1])/2.
        # remove 0 entries
        xx, yy = zip(*[(i,j) for (i,j) in zip(x, hist) if j > 0])
        ax.plot(xx,yy, marker = '.')
        ax.grid(linestyle = '--')
        ax.set_xscale('log')
        ax.set_yscale('log')
        ax.set_title('Degree distribution of Harry Potter network')
        ax.set_xlabel('Degree')
        ax.set_ylabel('Probability Density')
        plt.show()