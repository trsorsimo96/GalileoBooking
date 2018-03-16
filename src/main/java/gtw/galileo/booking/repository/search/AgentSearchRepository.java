package gtw.galileo.booking.repository.search;

import gtw.galileo.booking.domain.Agent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Agent entity.
 */
public interface AgentSearchRepository extends ElasticsearchRepository<Agent, Long> {
}
